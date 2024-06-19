import { useRecoilState } from "recoil";
import { Categories, CategoriesState, categoryState } from "../atoms";
import { useForm } from "react-hook-form";

interface IFrom {
  category: string;
}

function SelectCategory() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(CategoriesState);
  const { register, handleSubmit, setValue } = useForm<IFrom>();

  const handleValid = ({ category }: IFrom) => {
    setCategories((prev) => [...prev, { category, id: Date.now() }]);
    setValue("category", "");
  };
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as unknown as Categories);
  };
  const onClickDeleteCategory = () => {
    setCategories((categories) => {
      const targetIndax = categories.findIndex(
        (cat) => cat.category === category
      );

      return [
        ...categories.slice(0, targetIndax),
        ...categories.slice(targetIndax + 1),
      ];
    });
    setCategory("To Do"); // 카테고리 삭제후 바로 버튼을 없애기 위해 사용함
  };
  console.log(category, categories);
  return (
    <>
      <select value={category} onInput={onInput}>
        {categories.map((element) => (
          <option key={element.id} value={element.category}>
            {element.category}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("category", { required: "Please write it!" })}
          type="text"
          placeholder="Write a custom category"
        />
        <button>Add category</button>
      </form>

      {!Object.values(Categories).includes(category as any) && (
        <button onClick={onClickDeleteCategory}>Delete Category</button>
      )}
    </>
  );
}

export default SelectCategory;
