import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ReconInfo } from '@/types/wordlist';
import { 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Heart,
  Star,
  Gamepad2,
  BookOpen
} from 'lucide-react';

interface ReconFormProps {
  onNext: (info: ReconInfo) => void;
  onBack: () => void;
}

export function ReconForm({ onNext, onBack }: ReconFormProps) {
  const [info, setInfo] = useState<ReconInfo>({
    email: '',
    phoneNumber: '',
    address: '',
    university: '',
    hobbies: [],
    favoriteTeams: [],
    favoriteMovies: [],
    favoriteBooks: [],
    favoriteGames: []
  });

  const [textFields, setTextFields] = useState({
    hobbies: '',
    favoriteTeams: '',
    favoriteMovies: '',
    favoriteBooks: '',
    favoriteGames: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const processedInfo: ReconInfo = {
      ...info,
      hobbies: textFields.hobbies.split(',').map(h => h.trim()).filter(h => h),
      favoriteTeams: textFields.favoriteTeams.split(',').map(t => t.trim()).filter(t => t),
      favoriteMovies: textFields.favoriteMovies.split(',').map(m => m.trim()).filter(m => m),
      favoriteBooks: textFields.favoriteBooks.split(',').map(b => b.trim()).filter(b => b),
      favoriteGames: textFields.favoriteGames.split(',').map(g => g.trim()).filter(g => g)
    };
    
    onNext(processedInfo);
  };

  return (
    <Card className="cyber-border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-glow flex items-center gap-2">
          <Search className="w-6 h-6 text-cyber-blue" />
          Advanced Reconnaissance
        </CardTitle>
        <CardDescription>
          Additional intelligence gathering for comprehensive wordlist generation. The more data, the better the results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-cyber-blue">
              <Mail className="w-4 h-4" />
              Contact Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  className="cyber-border"
                  placeholder="john.doe@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={info.phoneNumber}
                  onChange={(e) => setInfo({ ...info, phoneNumber: e.target.value })}
                  className="cyber-border"
                  placeholder="+1-555-123-4567"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address/City</Label>
                <Input
                  id="address"
                  value={info.address}
                  onChange={(e) => setInfo({ ...info, address: e.target.value })}
                  className="cyber-border"
                  placeholder="New York, NY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University/School</Label>
                <Input
                  id="university"
                  value={info.university}
                  onChange={(e) => setInfo({ ...info, university: e.target.value })}
                  className="cyber-border"
                  placeholder="MIT, Harvard, etc."
                />
              </div>
            </div>
          </div>

          {/* Interests & Preferences */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-cyber-green">
              <Heart className="w-4 h-4" />
              Interests & Preferences
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hobbies" className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Hobbies & Interests
                </Label>
                <Textarea
                  id="hobbies"
                  value={textFields.hobbies}
                  onChange={(e) => setTextFields({ ...textFields, hobbies: e.target.value })}
                  className="cyber-border"
                  placeholder="photography, hiking, coding, music, cooking"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teams" className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-400" />
                  Favorite Sports Teams
                </Label>
                <Textarea
                  id="teams"
                  value={textFields.favoriteTeams}
                  onChange={(e) => setTextFields({ ...textFields, favoriteTeams: e.target.value })}
                  className="cyber-border"
                  placeholder="Lakers, Yankees, Cowboys, Barcelona"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="movies" className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-red-400" />
                  Favorite Movies/Shows
                </Label>
                <Textarea
                  id="movies"
                  value={textFields.favoriteMovies}
                  onChange={(e) => setTextFields({ ...textFields, favoriteMovies: e.target.value })}
                  className="cyber-border"
                  placeholder="Matrix, Inception, Game of Thrones, Breaking Bad"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="books" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  Favorite Books/Authors
                </Label>
                <Textarea
                  id="books"
                  value={textFields.favoriteBooks}
                  onChange={(e) => setTextFields({ ...textFields, favoriteBooks: e.target.value })}
                  className="cyber-border"
                  placeholder="Harry Potter, Lord of the Rings, Stephen King"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="games" className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-green-400" />
                  Favorite Games
                </Label>
                <Textarea
                  id="games"
                  value={textFields.favoriteGames}
                  onChange={(e) => setTextFields({ ...textFields, favoriteGames: e.target.value })}
                  className="cyber-border"
                  placeholder="Cyberpunk, Call of Duty, Minecraft, World of Warcraft"
                  rows={2}
                />
              </div>
            </div>
          </div>

          <div className="bg-card/50 p-4 rounded-lg border border-cyber-green/30">
            <h3 className="font-medium text-cyber-green mb-2">Reconnaissance Notes:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Email domains often become password components</li>
              <li>• Location names are frequently used in passwords</li>
              <li>• Hobbies and interests create strong password patterns</li>
              <li>• Sports teams + years = common password combinations</li>
              <li>• Game names and characters are popular choices</li>
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
              className="flex-1 neon-glow bg-gradient-to-r from-cyber-blue to-cyber-green hover:opacity-90 transition-all"
            >
              Next: Generation Options
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}