'use client';

import React, { memo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateLink } from '@/hooks/useCreateLink';

const CreateShortLinkForm: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [code, setCode] = useState('');

  const { createLinkMutation, isPending } = useCreateLink();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;

    try {
      await createLinkMutation({
        targetUrl: targetUrl.trim(),
        code: code.trim() || undefined,
      });

      setTargetUrl('');
      setCode('');
    } catch (error) {
      console.error('Error creating link', error);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Create Short Link</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Target URL */}
          <div className="space-y-2">
            <Label htmlFor="targetUrl">Target URL *</Label>
            <Input
              id="targetUrl"
              type="url"
              placeholder="https://example.com/long-url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              required
              disabled={isPending}
            />
          </div>

          {/* Custom Code */}
          <div className="space-y-2">
            <Label htmlFor="code">Custom Code (Optional)</Label>
            <Input
              id="code"
              type="text"
              placeholder="abc123"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              pattern="[A-Za-z0-9]{6,8}"
              maxLength={8}
              disabled={isPending}
            />
            <p className="text-sm text-muted-foreground">Leave empty to auto-generate a code</p>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Link'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default memo(CreateShortLinkForm);
