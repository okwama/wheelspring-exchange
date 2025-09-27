import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

interface PageLoadingProps {
  message?: string;
}

const PageLoading = ({ message }: PageLoadingProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LoadingSpinner message={message} />
      <Footer />
    </div>
  );
};

export default PageLoading;
