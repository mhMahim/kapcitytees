import BlogHero from "@/components/blog/ContactHero";
import BlogVideoCard from "@/components/dashboard/BlogVideoCard";
import React from "react";
import blogThumbnail from "@/assets/images/blog-thumbnail-img.png";
import Container from "@/components/shared/Container";

const BlogPage = () => {
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

  return (
    <main>
      <BlogHero />
      <Container>
        <div className="grid grid-cols-3 py-30 gap-5">
          {blogPosts.map((blog, index) => (
            <BlogVideoCard key={index} link="/blog/" {...blog} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default BlogPage;
