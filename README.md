# Flimmer Challenge Flow

## 📱 App Screenshots

<p align="center">
  <img src="screenshots/1-camera.png" width="200" alt="Camera Screen" />
  <img src="screenshots/2-challenge.png" width="200" alt="Challenge Screen" />
  <img src="screenshots/3-uploading.png" width="200" alt="Uploading" />
  <img src="screenshots/4-success.png" width="200" alt="Success Modal" />
  <img src="screenshots/5-share.png" width="200" alt="Share Screen" />
</p>

---

## 🐙 System Design: Child-Safe Content Moderation

### Database Schema: UserChallengeSubmission

```
UserChallengeSubmission {
  id: UUID (primary key)
  userId: UUID (foreign key → User)
  challengeId: UUID (foreign key → Challenge)
  
  // Image storage
  imageUrl: String (storage URL, e.g., S3)
  imageThumbnailUrl: String (optimized thumbnail)
  imageHash: String (Perceptual hashing (like pHash) detects duplicates and re-uploads of previously rejected content - prevents users from circumventing bans)
  
  // Moderation fields
  moderationStatus: Enum ['PENDING', 'APPROVED', 'REJECTED', 'FLAGGED']
  aiModerationScore: Float (0-1, confidence from AI scan)
  aiModerationFlags: JSON (specific issues detected: inappropriate, violence, etc.)
  humanModeratorId: UUID (nullable, foreign key → Moderator)
  moderationNotes: Text (nullable, reason for rejection)
  moderatedAt: Timestamp (nullable)
  
  // Metadata
  createdAt: Timestamp
  uploadedAt: Timestamp
  publishedAt: Timestamp (nullable, only set when approved)
  
  // Engagement (post-approval)
  viewCount: Integer (default: 0)
  likeCount: Integer (default: 0)
  
  // Safety tracking
  reportCount: Integer (default: 0, user reports)
  isHidden: Boolean (default: false, can be hidden after approval if reported)
  
  // Indexes for performance
  INDEX(userId, createdAt)
  INDEX(challengeId, publishedAt)
  INDEX(moderationStatus, createdAt)
}
```

### Safety Logic: Image Lifecycle

#### Phase 1: Client-Side (Phone)
1. **Capture**: User takes photo in app
2. **Pre-upload validation**:
   - Check file size (< 10MB)
   - Verify image format
   - Basic client-side checks (dimensions, corruption)
3. **Compression**: Reduce size for faster upload, generate thumbnail
4. **Encrypted upload**: Send to secure API endpoint via HTTPS

#### Phase 2: Server Reception
5. **Authentication**: Verify user session token
6. **Rate limiting**: Check user hasn't exceeded daily submission limit (prevent spam)
7. **Secure storage**: Upload to isolated storage bucket (not public-facing)
8. **Database record**: Create `UserChallengeSubmission` with `moderationStatus: PENDING`

#### Phase 3: AI Moderation (Automated, ~1-2 seconds)
9. **AI safety scan** using services like AWS Rekognition:
   - Detect explicit/inappropriate content
   - Check for violence, weapons, alcohol
   - Facial recognition (verify single person, age appropriateness)
   - Text detection (prevent hidden inappropriate text)
10. **Scoring**: Generate `aiModerationScore` and `aiModerationFlags`
11. **Auto-decision**:
    - **High confidence safe** (score > 0.95, no flags): → `SEMI-APPROVED` (We don't auto approve, but we can track if a human ever un-approves one of these semi-approved images. If not, we might be able to decide to auto-approve them in the future, if we are confident)
    - **Uncertain** (score > 0.3 && score < 0.95): → `FLAGGED` (requires human review)
    - **High confidence unsafe** (score < 0.3): → `REJECTED` (auto-reject)

#### Phase 4: Human Moderation
12. **Moderation queue**: submissions sent to trained moderators
13. **Human review**:
    - Moderator views image with context (challenge prompt, user age)
    - Makes approval/rejection decision
    - Adds `moderationNotes` if rejected
14. **Update record**: Set `moderationStatus`, `moderatedAt`, `humanModeratorId`

#### Phase 5: Publication (Approved Content Only)
15. **Move to public bucket**: Copy from isolated storage to CDN-backed public storage
16. **Set `publishedAt`**: Timestamp when made visible
17. **Index for feed**: Add to challenge leaderboard, user profile, public feed
18. **Notify user**: Push notification that submission was approved

#### Phase 6: Post-Publication Monitoring
19. **User reporting**: Other users can flag inappropriate content
20. **Auto-hide threshold**: If `reportCount` > 3, automatically set `isHidden: true` and re-queue for review
21. **Periodic re-scan**: Random sampling of approved content for quality checks
22. **Takedown**: Rejected content deleted from storage after 30 days

