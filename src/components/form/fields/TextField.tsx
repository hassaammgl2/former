import InputsWrapper from "../../custom/inputs-wrapper";
import { Input } from "../../ui/input";
import TextFieldConfigs from "../configs/TextFieldConfigs";

const TextField = ({ data }: { data: Field }) => {
  return (
    <InputsWrapper data={data} configs={<TextFieldConfigs data={data} />}>
      <p className="text-sm mb-2">{data.helperText}</p>
      <Input placeholder={data.placeholder} />
    </InputsWrapper>
  );
};

export default TextField;
