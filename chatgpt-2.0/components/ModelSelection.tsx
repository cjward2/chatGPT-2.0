"use client";
import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

const ModelSelection = () => {
  const { data: models, isLoading } = useSWR("models", fetchModels);

  //useSWR leveraged as state manager
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <div className="my-2">
      <Select
        className="mt-2"
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        options={models?.modelOptions}
        menuPosition="fixed"
        classNames={{
          control: (_state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
};

export default ModelSelection;
