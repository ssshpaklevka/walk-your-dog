import { useState } from "react";
import SelectableOption from "./selector";

export default function SelectableForm({ control }: any) {
  const [gender, setGender] = useState("Male");
  const [sterilized, setSterilized] = useState(false);
  const [leash, setLeash] = useState(false);
  const [aggressive, setAggressive] = useState(false);
  const [bite, setBite] = useState(false);
  return (
    <>
      <SelectableOption
        control={control}
        name="gender"
        title="Пол"
        options={["Мальчик", "Девочка"]}
      />
      <SelectableOption
        control={control}
        name="castration"
        title="Стерелизация/Кастрация"
        options={["Да", "Нет"]}
      />
      <SelectableOption
        control={control}
        name="leash"
        title="Тянет поводок"
        options={["Да", "Нет"]}
      />
      <SelectableOption
        control={control}
        name="aggressive"
        title="Агрессивен"
        options={["Да", "Нет"]}
      />
      <SelectableOption
        control={control}
        name="bite"
        title="Кусается"
        options={["Да", "Нет"]}
      />
    </>
  );
}
