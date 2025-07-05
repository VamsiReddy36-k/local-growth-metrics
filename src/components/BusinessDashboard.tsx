
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BusinessData } from '@/types/business';
import { Star, MessageSquare, Sparkles, TrendingUp, RotateCcw } from 'lucide-react';

interface BusinessDashboardProps {
  data: BusinessData;
  onRegenerateHeadline: () => void;
  isLoading: boolean;
}

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ 
  data, 
  onRegenerateHeadline, 
  isLoading 
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-5 h-5 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            {data.name}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {data.location}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Google Rating Card */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Star className="w-6 h-6 text-yellow-500" />
              Google Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl font-bold text-gray-900">{data.rating}</span>
              <div className="flex items-center gap-1">
                {renderStars(data.rating)}
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
              Above Average
            </Badge>
          </CardContent>
        </Card>

        {/* Reviews Card */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="w-6 h-6 text-blue-500" />
              Customer Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-bold text-gray-900">{data.reviews}</span>
              <span className="text-gray-600">reviews</span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              Strong Engagement
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* SEO Headline Card */}
      <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI-Generated SEO Headline
          </CardTitle>
          <CardDescription>
            Optimized headline to boost your online presence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-6 mb-4 border-l-4 border-purple-500">
            <p className="text-lg font-semibold text-gray-900 leading-relaxed">
              "{data.headline}"
            </p>
          </div>
          
          <Button
            onClick={onRegenerateHeadline}
            disabled={isLoading}
            variant="outline"
            className="w-full sm:w-auto bg-white hover:bg-purple-50 border-purple-200 text-purple-700 hover:text-purple-800 transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Regenerate SEO Headline
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center pt-4">
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400"
        >
          Analyze Another Business
        </Button>
      </div>
    </div>
  );
};

export default BusinessDashboard;
