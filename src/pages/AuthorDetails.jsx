import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowDown, Plus } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function AuthorDetails() {
  const { id } = useParams();
  const [Author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  function formatNumber(num) {
    if (!num) return "0";
    return num.toLocaleString("ru-RU").replace(/,/g, " ");
  }

  useEffect(() => {
    fetch(`https://library-1dmu.onrender.com/get_one_book/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API xatosi:", error);
        setLoading(false);
      });
  }, [id]);


  if (loading)
    return (
      <div className="flex h-screen items-center">
        <Button className="mx-auto flex items-center" disabled>
          <Loader2 className="animate-spin" />
          Malumotlar yuklanmoqda...
        </Button>
      </div>
    );

  return (
    <section
      className="min-h-screen bg-[length:1000px_900px] bg-[position:600px_180px] bg-no-repeat text-white"
      style={{ backgroundImage: "url('/bg.svg')" }}
    >
      <div className="flex justify-end pt-5 pr-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="  border-2 border-gray-300 shadow-lg shadow-gray-400/50 hover:bg-gray-100 dark:border-gray-600 dark:shadow-gray-800/50 dark:hover:bg-gray-800 p-3 px-4 mb-8"
            >
              <Plus className="text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-2xl overflow-y-auto">
            <form>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">Edit Author</SheetTitle>
                <SheetDescription>
                  Authorni ma'lumotlarni o'zgartirish
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Upload image
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Last name
                  </Label>
                  <Input id="lastName" name="lastName" className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="birthDate" className="text-right">
                    Date of birth
                  </Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deathDate" className="text-right">
                    Date of death
                  </Label>
                  <Input
                    id="deathDate"
                    name="deathDate"
                    type="date"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    Country
                  </Label>
                  <Input id="country" name="country" className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Muallif haqida ma'lumot..."
                    className="col-span-3 min-h-[80px]"
                  />
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" className="w-full">
                    Create
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mx-[81px] mt-10 flex gap-10">
        <img
          src={Author?.img}
          alt={Author?.full_name}
          className="h-[500px] w-[350px] rounded-xl object-cover shadow-md"
        />

        <div className="flex flex-col">
          <h3 className="font-dancing text-4xl text-[#e8c282]">
            {Author.full_name}
          </h3>
          <p className="text-lg capitalize text-[#e8c282]">{Author.country}</p>
          <p className="text-sm leading-relaxed text-gray-300">{Author?.bio}</p>
        </div>
      </div>
    </section>
  );
}

export default AuthorDetails;