import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInfo } from '@/types/wordlist';
import { User, Users, Baby, Heart, Building } from 'lucide-react';

interface PersonalInfoFormProps {
  onNext: (info: PersonalInfo) => void;
}

export function PersonalInfoForm({ onNext }: PersonalInfoFormProps) {
  const [info, setInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    nickname: '',
    birthDate: '',
    partnerName: '',
    partnerNickname: '',
    partnerBirthDate: '',
    childName: '',
    childNickname: '',
    childBirthDate: '',
    petName: '',
    companyName: '',
    keywords: []
  });

  const [keywordsText, setKeywordsText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const keywords = keywordsText.split(',').map(k => k.trim()).filter(k => k);
    onNext({ ...info, keywords });
  };

  return (
    <Card className="cyber-border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-glow flex items-center gap-2">
          <User className="w-6 h-6 text-cyber-red" />
          Target Profile Information
        </CardTitle>
        <CardDescription>
          Enter personal information about the target. Leave fields empty if unknown.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-cyber-red">
              <User className="w-4 h-4" />
              Personal Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={info.firstName}
                  onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
                  className="cyber-border"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={info.lastName}
                  onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
                  className="cyber-border"
                  placeholder="Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  value={info.nickname}
                  onChange={(e) => setInfo({ ...info, nickname: e.target.value })}
                  className="cyber-border"
                  placeholder="johnny"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Birth Date (DDMMYYYY)</Label>
                <Input
                  id="birthDate"
                  value={info.birthDate}
                  onChange={(e) => setInfo({ ...info, birthDate: e.target.value })}
                  className="cyber-border"
                  placeholder="15071990"
                  maxLength={8}
                />
              </div>
            </div>
          </div>

          {/* Partner Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-cyber-purple">
              <Heart className="w-4 h-4" />
              Partner Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner Name</Label>
                <Input
                  id="partnerName"
                  value={info.partnerName}
                  onChange={(e) => setInfo({ ...info, partnerName: e.target.value })}
                  className="cyber-border"
                  placeholder="Jane"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerNickname">Partner Nickname</Label>
                <Input
                  id="partnerNickname"
                  value={info.partnerNickname}
                  onChange={(e) => setInfo({ ...info, partnerNickname: e.target.value })}
                  className="cyber-border"
                  placeholder="janey"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerBirthDate">Partner Birth Date (DDMMYYYY)</Label>
                <Input
                  id="partnerBirthDate"
                  value={info.partnerBirthDate}
                  onChange={(e) => setInfo({ ...info, partnerBirthDate: e.target.value })}
                  className="cyber-border"
                  placeholder="22031988"
                  maxLength={8}
                />
              </div>
            </div>
          </div>

          {/* Child Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-cyber-blue">
              <Baby className="w-4 h-4" />
              Child Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Child Name</Label>
                <Input
                  id="childName"
                  value={info.childName}
                  onChange={(e) => setInfo({ ...info, childName: e.target.value })}
                  className="cyber-border"
                  placeholder="Alex"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childNickname">Child Nickname</Label>
                <Input
                  id="childNickname"
                  value={info.childNickname}
                  onChange={(e) => setInfo({ ...info, childNickname: e.target.value })}
                  className="cyber-border"
                  placeholder="ally"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childBirthDate">Child Birth Date (DDMMYYYY)</Label>
                <Input
                  id="childBirthDate"
                  value={info.childBirthDate}
                  onChange={(e) => setInfo({ ...info, childBirthDate: e.target.value })}
                  className="cyber-border"
                  placeholder="10052015"
                  maxLength={8}
                />
              </div>
            </div>
          </div>

          {/* Other Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-cyber-green">
              <Building className="w-4 h-4" />
              Other Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="petName">Pet Name</Label>
                <Input
                  id="petName"
                  value={info.petName}
                  onChange={(e) => setInfo({ ...info, petName: e.target.value })}
                  className="cyber-border"
                  placeholder="fluffy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={info.companyName}
                  onChange={(e) => setInfo({ ...info, companyName: e.target.value })}
                  className="cyber-border"
                  placeholder="TechCorp"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Additional Keywords</Label>
              <Textarea
                id="keywords"
                value={keywordsText}
                onChange={(e) => setKeywordsText(e.target.value)}
                className="cyber-border"
                placeholder="hacker, juice, black, gaming, music (comma separated)"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Enter keywords separated by commas (hobbies, interests, favorite things, etc.)
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full neon-glow bg-gradient-to-r from-cyber-red to-cyber-purple hover:opacity-90 transition-all"
          >
            Next: Social Media Intelligence
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
