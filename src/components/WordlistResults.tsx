import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { GeneratedWordlist } from '@/types/wordlist';
import { 
  Download, 
  Copy, 
  Search, 
  Filter, 
  BarChart3,
  Clock,
  User,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface WordlistResultsProps {
  wordlist: GeneratedWordlist;
  onBack: () => void;
  onNewGeneration: () => void;
}

export function WordlistResults({ wordlist, onBack, onNewGeneration }: WordlistResultsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLength, setFilterLength] = useState('');
  const { toast } = useToast();

  const filteredPasswords = wordlist.passwords.filter(password => {
    const matchesSearch = password.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLength = filterLength === '' || password.length.toString() === filterLength;
    return matchesSearch && matchesLength;
  });

  const handleDownload = () => {
    const content = filteredPasswords.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${wordlist.targetProfile.firstName || 'target'}_wordlist.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded Successfully",
      description: `Wordlist saved with ${filteredPasswords.length} passwords`,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(filteredPasswords.join('\n'));
      toast({
        title: "Copied to Clipboard",
        description: `${filteredPasswords.length} passwords copied`,
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const getPasswordStats = () => {
    const lengths = filteredPasswords.map(p => p.length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length || 0;
    const lengthCounts = lengths.reduce((acc, len) => {
      acc[len] = (acc[len] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    return {
      total: filteredPasswords.length,
      avgLength: Math.round(avgLength * 10) / 10,
      mostCommonLength: Object.entries(lengthCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 0
    };
  };

  const stats = getPasswordStats();
  const uniqueLengths = [...new Set(filteredPasswords.map(p => p.length))].sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="text-2xl text-glow flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-cyber-green" />
            Wordlist Generated Successfully
          </CardTitle>
          <CardDescription>
            Advanced password dictionary ready for ethical penetration testing
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card/50 p-4 rounded-lg border border-cyber-green/30 text-center">
              <BarChart3 className="w-5 h-5 text-cyber-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyber-green">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total Passwords</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg border border-cyber-blue/30 text-center">
              <BarChart3 className="w-5 h-5 text-cyber-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyber-blue">{stats.avgLength}</div>
              <div className="text-xs text-muted-foreground">Avg Length</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg border border-cyber-purple/30 text-center">
              <User className="w-5 h-5 text-cyber-purple mx-auto mb-2" />
              <div className="text-lg font-bold text-cyber-purple truncate">
                {wordlist.targetProfile.firstName || 'Target'}
              </div>
              <div className="text-xs text-muted-foreground">Target Profile</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg border border-cyber-red/30 text-center">
              <Clock className="w-5 h-5 text-cyber-red mx-auto mb-2" />
              <div className="text-sm font-bold text-cyber-red">
                {new Date(wordlist.generatedAt).toLocaleTimeString()}
              </div>
              <div className="text-xs text-muted-foreground">Generated</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Button 
              onClick={handleDownload}
              className="neon-glow bg-gradient-to-r from-cyber-green to-cyber-blue hover:opacity-90"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Wordlist
            </Button>
            <Button 
              onClick={handleCopy}
              variant="outline"
              className="cyber-border"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </Button>
            <Button 
              onClick={onNewGeneration}
              variant="outline"
              className="cyber-border"
            >
              <FileText className="w-4 h-4 mr-2" />
              New Generation
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-2 flex-1 min-w-64">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search passwords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="cyber-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filterLength}
                onChange={(e) => setFilterLength(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-md text-sm cyber-border"
              >
                <option value="">All Lengths</option>
                {uniqueLengths.map(length => (
                  <option key={length} value={length}>{length} chars</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Options Display */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Active Options:</h3>
            <div className="flex flex-wrap gap-2">
              {wordlist.options.includeSpecialChars && <Badge variant="outline">Special Chars</Badge>}
              {wordlist.options.includeNumbers && <Badge variant="outline">Numbers</Badge>}
              {wordlist.options.includeLeetSpeak && <Badge variant="outline">Leet Speak</Badge>}
              {wordlist.options.includeDates && <Badge variant="outline">Dates</Badge>}
              {wordlist.options.includeReversed && <Badge variant="outline">Reversed</Badge>}
              {wordlist.options.includeCombinations && <Badge variant="outline">Combinations</Badge>}
              {wordlist.options.includeCommonPasswords && <Badge variant="outline">Common</Badge>}
              {wordlist.options.includeKeyboardPatterns && <Badge variant="outline">Keyboard</Badge>}
              {wordlist.options.includeBrandNames && <Badge variant="outline">Brands</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password List */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Generated Passwords ({filteredPasswords.length})</span>
            <Badge variant="outline" className="text-cyber-green border-cyber-green">
              {wordlist.options.minLength}-{wordlist.options.maxLength} chars
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 w-full rounded-md border border-cyber-red/30 p-4">
            <div className="grid gap-1">
              {filteredPasswords.map((password, index) => (
                <div 
                  key={index}
                  className="font-mono text-sm p-2 rounded bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-between group"
                >
                  <span className="text-cyber-green">{password}</span>
                  <Badge variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {password.length}
                  </Badge>
                </div>
              ))}
              {filteredPasswords.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No passwords match the current filters
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button 
          onClick={onBack}
          variant="outline"
          className="cyber-border"
        >
          Back to Options
        </Button>
        <Button 
          onClick={onNewGeneration}
          className="flex-1 neon-glow bg-gradient-to-r from-cyber-red to-cyber-purple hover:opacity-90"
        >
          Create New Wordlist
        </Button>
      </div>
    </div>
  );
}