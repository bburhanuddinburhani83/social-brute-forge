import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SocialMediaInfo } from '@/types/wordlist';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Github, 
  Youtube,
  MessageCircle,
  Hash,
  Users,
  Send
} from 'lucide-react';

interface SocialMediaFormProps {
  onNext: (info: SocialMediaInfo) => void;
  onBack: () => void;
}

export function SocialMediaForm({ onNext, onBack }: SocialMediaFormProps) {
  const [info, setInfo] = useState<SocialMediaInfo>({
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    github: '',
    tiktok: '',
    youtube: '',
    reddit: '',
    discord: '',
    telegram: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(info);
  };

  const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: '@username or profile URL', color: 'text-pink-400' },
    { key: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'facebook.com/username', color: 'text-blue-400' },
    { key: 'twitter', label: 'Twitter/X', icon: Twitter, placeholder: '@username or twitter.com/username', color: 'text-blue-300' },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'linkedin.com/in/username', color: 'text-blue-600' },
    { key: 'github', label: 'GitHub', icon: Github, placeholder: 'github.com/username', color: 'text-gray-300' },
    { key: 'tiktok', label: 'TikTok', icon: Hash, placeholder: '@username or tiktok.com/@username', color: 'text-pink-300' },
    { key: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'youtube.com/@username', color: 'text-red-400' },
    { key: 'reddit', label: 'Reddit', icon: MessageCircle, placeholder: 'reddit.com/u/username', color: 'text-orange-400' },
    { key: 'discord', label: 'Discord', icon: Users, placeholder: 'username#1234', color: 'text-indigo-400' },
    { key: 'telegram', label: 'Telegram', icon: Send, placeholder: '@username or t.me/username', color: 'text-blue-500' }
  ];

  return (
    <Card className="cyber-border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-glow flex items-center gap-2">
          <Instagram className="w-6 h-6 text-cyber-purple" />
          Social Media Intelligence
        </CardTitle>
        <CardDescription>
          Enter social media profiles to extract usernames and patterns. This greatly improves wordlist quality.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialPlatforms.map(({ key, label, icon: Icon, placeholder, color }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  {label}
                </Label>
                <Input
                  id={key}
                  value={info[key as keyof SocialMediaInfo]}
                  onChange={(e) => setInfo({ ...info, [key]: e.target.value })}
                  className="cyber-border"
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>

          <div className="bg-card/50 p-4 rounded-lg border border-cyber-purple/30">
            <h3 className="font-medium text-cyber-purple mb-2">Intelligence Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Profile URLs or usernames extract valuable patterns</li>
              <li>• Usernames often contain birth years, initials, or interests</li>
              <li>• Multiple platforms may reveal naming patterns</li>
              <li>• Even partial information is valuable for generation</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="cyber-border"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              className="flex-1 neon-glow bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 transition-all"
            >
              Next: Advanced Reconnaissance
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}