import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function Authors() {
  const [Authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    image: null,
    fullName: "",
    dateOfBirth: "",
    dateOfDeath: "",
    country: "",
    bio: ""
  })

  function handleChange(e) {
    const { name, value, type, files } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value
    }))
  }

  function validate() {
    if (!formData.image) {
      toast.error("Rasm tanlashingiz kerak!")
      return false
    }

    if (!formData.fullName) {
      toast.error("Shoir ismini kiritishingiz kerak!")
      return false
    } else if (formData.fullName.length < 3) {
      toast.error("Shoirning ismini to'liq kiritishingiz kerak!")
      return false
    }

    if (!formData.dateOfBirth) {
      toast.error("Shoirni tug'ulgan sanasini kiritishingiz kerak!")
      return false
    }

    if (!formData.country) {
      toast.error("Shoirni yashash joyini kiritishingiz kerak!")
      return false
    }

    if (!formData.bio) {
      toast.error("Shoirni haqida ma'lumot kiritishingiz kerak!")
      return false
    }

    return true
  }

  function handleCreateAuthor(event) {
    event.preventDefault()

    let isValid = validate()
    if (!isValid) {
      return
    }

    let newAuthor = {
      full_name: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      dateOfDeath: formData.dateOfDeath,
      country: formData.country,
      bio: formData.bio
    }

    console.log(newAuthor);

    setFormData({
      image: null,
      fullName: "",
      dateOfBirth: "",
      dateOfDeath: "",
      country: "",
      bio: ""
    })
  }

  useEffect(() => {
    fetch("https://library-project-6agw.onrender.com/get_authors")
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API xatosi:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center h-screen">
        <Button className="mx-auto flex items-center" disabled>
          <Loader2 className="animate-spin" />
          Malumotlar yuklanmoqda...
        </Button>
      </div>
    );

  return (
    <div className="p-5">
      <Toaster />
      <div className="flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="  border-2 border-gray-300 shadow-lg shadow-gray-400/50 hover:bg-gray-100 dark:border-gray-600 dark:shadow-gray-800/50 dark:hover:bg-gray-800 p-3 px-4 mb-8"
            >
              <Plus />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-2xl overflow-y-auto">
            <form>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">Add Author</SheetTitle>
                <SheetDescription>
                  Muallif qo'shish uchun ma'lumotlarni to'ldiring
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-[30px] py-4">
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
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    className="col-span-3"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dateOfBirth" className="text-right">
                    Date of birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    className="col-span-3"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dateOfDeath" className="text-right">
                    Date of death
                  </Label>
                  <Input
                    id="dateOfDeath"
                    name="dateOfDeath"
                    type="date"
                    className="col-span-3"
                    value={formData.dateOfDeath}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    className="col-span-3"
                    value={formData.country}
                    onChange={handleChange}
                  />
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
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={handleCreateAuthor} type="submit" className="w-full">
                    Create
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <ul className="mx-auto grid grid-cols-6 space-y-2">
        {Authors.map((author) => (
          <li key={author._id} className="rounded-lg p-4 shadow-md">
            <img
              src={author.img}
              alt={author.full_name}
              className="h-60 w-full rounded-lg object-cover"
            />
            <h3 className="font-dancing text-center text-[20px] font-normal uppercase">
              {author.full_name}
            </h3>
            <p className="text-center text-[12px] font-light capitalize text-gray-600">
              {new Date(author.dateOfBirth).getFullYear()} -{" "}
              {new Date(author.dateOfDeath).getFullYear()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Authors;
