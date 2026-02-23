import BlogVideoCard from "@/components/dashboard/BlogVideoCard";
import blogThumbnail from "@/assets/images/blog-thumbnail-img.png";

const blogPosts = [
  {
    id: 1,
    slug: "barbers-guide-to-using-beard-oil",
    title: "Barber's Guide to Using Beard Oil",
    description:
      "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
    thumbnail: blogThumbnail,
    progress: 100,
  },
  {
    id: 2,
    title: "Barber's Guide to Using Beard Oil",
    description:
      "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
    thumbnail: blogThumbnail,
    progress: 0,
  },
  {
    id: 3,
    title: "Barber's Guide to Using Beard Oil",
    description:
      "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
    thumbnail: blogThumbnail,
    progress: 0,
  },
  {
    id: 4,
    title: "Barber's Guide to Using Beard Oil",
    description:
      "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
    thumbnail: blogThumbnail,
    progress: 0,
  },
  {
    id: 5,
    title: "Barber's Guide to Using Beard Oil",
    description:
      "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
    thumbnail: blogThumbnail,
    progress: 0,
  },
  {
    id: 6,
    title: "Barber's Guide to Using Beard Oil",
    description:
      "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
    thumbnail: blogThumbnail,
    progress: 0,
  },
  {
    id: 7,
    title: "Barber's Guide to Using Beard Oil",
    description:
      "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
    thumbnail: blogThumbnail,
    progress: 0,
  },
  {
    id: 8,
    title: "Barber's Guide to Using Beard Oil",
    description:
      "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
    thumbnail: blogThumbnail,
    progress: 0,
  },
  {
    id: 9,
    title: "Barber's Guide to Using Beard Oil",
    description:
      "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
    thumbnail: blogThumbnail,
    progress: 0,
  },
  {
    id: 10,
    title: "Barber's Guide to Using Beard Oil",
    description:
      "Learn the correct way to apply beard oil to reduce itch, soften your beard, and keep your skin healthy. Simple steps for better daily grooming.",
    thumbnail: blogThumbnail,
    progress: 0,
  },
];

const totalProgress = Math.round(
  blogPosts.reduce((sum, p) => sum + (p.progress ?? 0), 0) / blogPosts.length
);

const DashboardBlogPage = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Total tutorial completion progress bar */}
      <div className="bg-white rounded-2xl p-5 shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)]">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-sm text-[#0F2A3C]">Tutorial Completion</span>
          <span className="font-bold text-sm text-[#0F2A3C]">{totalProgress}%</span>
        </div>
        <div className="w-full h-3 bg-[#E8EDF2] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0F2A3C] rounded-full transition-all duration-700"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-[#919EAB]">
          {blogPosts.filter((p) => (p.progress ?? 0) === 100).length} of {blogPosts.length} tutorials completed
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {blogPosts.map((post) => (
          <BlogVideoCard
            key={post.id}
            title={post.title}
            description={post.description}
            thumbnail={post.thumbnail}
            slug={post.slug ?? String(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardBlogPage;
