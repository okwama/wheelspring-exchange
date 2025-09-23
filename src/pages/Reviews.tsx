import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Search, ThumbsUp, Calendar, User } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      vehicle: "2023 BMW 3 Series",
      reviewer: "Michael Chen",
      date: "2 weeks ago",
      rating: 5,
      title: "Outstanding Performance and Luxury",
      content: "After 6 months of ownership, I can confidently say this is the best car I've ever owned. The driving dynamics are exceptional, and the interior quality is top-notch.",
      helpful: 24,
      verified: true,
    },
    {
      id: 2,
      vehicle: "2022 Porsche 911",
      reviewer: "Sarah Johnson",
      date: "1 month ago",
      rating: 5,
      title: "Pure Driving Perfection",
      content: "The 911 never disappoints. Every drive is an experience. The engine sound, the handling, everything about this car is engineered to perfection.",
      helpful: 31,
      verified: true,
    },
    {
      id: 3,
      vehicle: "2023 Mercedes GLE",
      reviewer: "David Rodriguez",
      date: "3 weeks ago",
      rating: 4,
      title: "Great Family SUV with Premium Feel",
      content: "Spacious, comfortable, and loaded with technology. Perfect for family trips. Only minor complaint is the fuel economy could be better.",
      helpful: 18,
      verified: true,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">Car Reviews</h1>
          <p className="text-muted-foreground text-lg">
            Real reviews from verified owners to help you make the right choice
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-automotive-navy mb-2">12,847</div>
              <div className="text-sm text-muted-foreground">Total Reviews</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-automotive-navy mb-2">4.6</div>
              <div className="flex justify-center mb-2">
                {renderStars(5)}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-automotive-navy mb-2">89%</div>
              <div className="text-sm text-muted-foreground">Would Recommend</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-automotive-navy mb-2">256</div>
              <div className="text-sm text-muted-foreground">Car Models</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search reviews..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  <SelectItem value="porsche">Porsche</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars & Up</SelectItem>
                  <SelectItem value="3">3 Stars & Up</SelectItem>
                  <SelectItem value="2">2 Stars & Up</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                  <SelectItem value="rating-high">Highest Rating</SelectItem>
                  <SelectItem value="rating-low">Lowest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{review.vehicle}</h3>
                      {review.verified && <Badge variant="secondary">Verified Owner</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {review.reviewer}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {review.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-3">{review.title}</h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {review.content}
                </p>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm">
                    Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Reviews
          </Button>
        </div>

        {/* Write Review CTA */}
        <Card className="mt-12 bg-gradient-to-r from-automotive-navy to-automotive-accent text-white">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
            <p className="mb-6 opacity-90">
              Help other buyers by writing a review of your vehicle
            </p>
            <Button variant="secondary" size="lg">
              Write a Review
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;