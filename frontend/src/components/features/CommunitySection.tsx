'use client'

import { useState } from 'react'
import { Comment } from '@/types'
import { Card, Button, Input } from '@/components/ui'

export interface CommunitySectionProps {
  projectId?: number
  comments: Comment[]
  onAddComment?: (content: string) => Promise<void>
}

export function CommunitySection({
  comments,
  onAddComment,
}: CommunitySectionProps) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !onAddComment) return

    setIsSubmitting(true)
    try {
      await onAddComment(newComment)
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-4">Community Feedback</h3>

        {onAddComment && (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="space-y-3">
              <Input
                id="comment"
                label="Add a comment"
                placeholder="Share your thoughts about this project..."
                value={newComment}
                onChange={(e) => setNewComment(e.currentTarget.value)}
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                variant="primary"
                disabled={!newComment.trim() || isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-muted text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border border-border rounded-lg space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {comment.user?.username || 'Anonymous'}
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {comment.likes && (
                  <p className="text-sm text-muted">{comment.likes} likes</p>
                )}
              </div>
              <p className="text-foreground">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
