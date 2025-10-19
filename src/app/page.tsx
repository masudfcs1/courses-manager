import Image from "next/image";
import CourseCard from "./(root)/(view)/courseCard/_components/courseCard";

export default function Home() {
  return (
   <div>
    <h1>Welcome to the Home Page</h1>
    <CourseCard/>
   </div>
  );
}
