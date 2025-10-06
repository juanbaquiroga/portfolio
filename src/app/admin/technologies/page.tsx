"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addTechnology } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const technologySchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().url("Invalid URL"),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Invalid color format"),
  svg: z.string().min(1, "SVG code is required"),
});

type TechnologyFormData = z.infer<typeof technologySchema>;

const TechnologiesPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TechnologyFormData>({
    resolver: zodResolver(technologySchema),
  });

  const parseSvg = (svgString: string) => {
    try {
      const viewBoxMatch = svgString.match(/viewBox="([^"]*)"/);
      const pathMatch = svgString.match(/d="([^"]*)"/);

      if (!viewBoxMatch || !pathMatch) {
        throw new Error("Invalid SVG code: viewBox or path not found.");
      }

      return {
        viewBox: viewBoxMatch[1],
        path: pathMatch[1],
      };
    } catch (error) {
      console.error("SVG Parsing Error:", error);
      return null;
    }
  };

  const onSubmit = async (data: TechnologyFormData) => {
    const svgData = parseSvg(data.svg);

    if (!svgData) {
      setError("svg", {
        type: "manual",
        message:
          "Could not parse SVG. Make sure it contains viewBox and path (d) attributes.",
      });
      return;
    }

    try {
      const newTechnology = {
        title: data.title,
        link: data.link,
        color: data.color,
        viewBox: svgData.viewBox,
        path: svgData.path,
      };
      await addTechnology(newTechnology);
      router.push("/admin");
    } catch (error) {
      console.error("Error creating technology:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <input {...register("title")} placeholder="Title" />
      {errors.title && <p>{errors.title.message}</p>}

      {/* Link */}
      <input {...register("link")} placeholder="Documentation Link" />
      {errors.link && <p>{errors.link.message}</p>}

      {/* Color */}
      <input {...register("color")} placeholder="Color (e.g. #FFFFFF)" />
      {errors.color && <p>{errors.color.message}</p>}

      {/* SVG Code */}
      <textarea {...register("svg")} placeholder="Paste full SVG code here" />
      {errors.svg && <p>{errors.svg.message}</p>}

      <button type="submit">Create Technology</button>
    </form>
  );
};

export default TechnologiesPage;