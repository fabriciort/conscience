'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function NewVideoPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    thumbnail_url: '',
    required_tier: 'free' as 'free' | 'essential' | 'advanced' | 'corporate',
    tags: '',
    published: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Not authenticated');
    }

    const tagsArray = formData.tags
      .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const { error: insertError } = await supabase.from('videos').insert({
      researcher_id: user.id,
      title: formData.title,
      description: formData.description || null,
      video_url: formData.video_url,
      thumbnail_url: formData.thumbnail_url || null,
      required_tier: formData.required_tier,
      tags: tagsArray.length > 0 ? tagsArray : null,
      published: formData.published,
      published_at: formData.published ? new Date().toISOString() : null,
      });

      if (insertError) throw insertError;

      router.push('/studio/videos');
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--text-primary)] mb-2">
          Create New Video
        </h1>
        <p className="text-[color:var(--text-secondary)]">
          Add a new video to your content library
        </p>
      </div>

        {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[color:var(--surface)] rounded-xl border border-[color:var(--border)] p-6 space-y-6">
        {/* Title */}
        <div>
            <label className="block text-sm font-semibold text-[color:var(--text-primary)] mb-2">
              Title *
          </label>
          <input
            type="text"
            value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            required
              className="w-full px-4 py-3 bg-[color:var(--background)] border border-[color:var(--border)] rounded-lg text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition-colors"
              placeholder="Enter video title"
          />
        </div>

        {/* Description */}
        <div>
            <label className="block text-sm font-semibold text-[color:var(--text-primary)] mb-2">
              Description
          </label>
          <textarea
            value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            rows={4}
              className="w-full px-4 py-3 bg-[color:var(--background)] border border-[color:var(--border)] rounded-lg text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition-colors resize-none"
              placeholder="Brief description of the video content"
          />
        </div>

        {/* Video URL */}
        <div>
            <label className="block text-sm font-semibold text-[color:var(--text-primary)] mb-2">
              Video URL * (YouTube/Vimeo)
          </label>
          <input
            type="url"
            value={formData.video_url}
              onChange={(e) =>
                setFormData({ ...formData, video_url: e.target.value })
              }
            required
              className="w-full px-4 py-3 bg-[color:var(--background)] border border-[color:var(--border)] rounded-lg text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition-colors"
              placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        {/* Thumbnail URL */}
        <div>
            <label className="block text-sm font-semibold text-[color:var(--text-primary)] mb-2">
              Thumbnail URL
          </label>
          <input
            type="url"
            value={formData.thumbnail_url}
              onChange={(e) =>
                setFormData({ ...formData, thumbnail_url: e.target.value })
              }
              className="w-full px-4 py-3 bg-[color:var(--background)] border border-[color:var(--border)] rounded-lg text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition-colors"
              placeholder="https://example.com/thumbnail.jpg"
          />
        </div>

          {/* Tier Selection */}
        <div>
            <label className="block text-sm font-semibold text-[color:var(--text-primary)] mb-2">
              Required Tier *
          </label>
          <select
            value={formData.required_tier}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  required_tier: e.target.value as any,
                })
              }
              className="w-full px-4 py-3 bg-[color:var(--background)] border border-[color:var(--border)] rounded-lg text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition-colors"
          >
              <option value="free">Free</option>
              <option value="essential">Essential</option>
              <option value="advanced">Advanced</option>
              <option value="corporate">Corporate</option>
          </select>
        </div>

        {/* Tags */}
        <div>
            <label className="block text-sm font-semibold text-[color:var(--text-primary)] mb-2">
              Tags (comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full px-4 py-3 bg-[color:var(--background)] border border-[color:var(--border)] rounded-lg text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] transition-colors"
              placeholder="tutorial, beginner, python"
            />
        </div>

          {/* Published Toggle */}
        <div className="flex items-center gap-3">
          <input
              type="checkbox"
            id="published"
            checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="w-5 h-5 rounded border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)] focus:ring-offset-0"
          />
            <label
              htmlFor="published"
              className="text-sm font-medium text-[color:var(--text-primary)] cursor-pointer"
            >
              Publish immediately
          </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isLoading ? 'Creating...' : 'Create Video'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-[color:var(--surface)] border border-[color:var(--border)] text-[color:var(--text-primary)] font-semibold rounded-lg hover:bg-[color:var(--surface-hover)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
