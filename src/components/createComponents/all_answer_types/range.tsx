import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch } from "react-redux";
import {
  setMinValue,
  setMaxValue,
  setStep,
} from "@/redux/features/formField/formFieldSlice";

interface RangeSliderProps {
  focus: boolean;
  index: number;
  minValue: number | undefined;
  maxValue: number | undefined;
  step: number | undefined;
}

const Range: React.FC<RangeSliderProps> = ({
  focus,
  index,
  maxValue,
  minValue,
  step,
}) => {
  const dispatch = useDispatch();
  const [minVal, setMinVal] = useState(minValue ?? 0);
  const [maxVal, setMaxVal] = useState(maxValue ?? 100);
  const [steps, setSteps] = useState(step ?? 1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "minValue":
        setMinVal(Number(value));
        break;
      case "maxValue":
        setMaxVal(Number(value));
        break;
      case "step":
        setSteps(Number(value));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    dispatch(setMinValue({ index, minValue: minVal }));
    dispatch(setMaxValue({ index, maxValue: maxVal }));
    dispatch(setStep({ index, step: steps }));
  }, [minVal, maxVal, steps, dispatch, index]);

  return (
    <div className="flex flex-col  space-y-8 ">
      {focus && (
        <div className="flex xs:space-x-2 flex-wrap justify-center space-y-4 space-x-0 xs:space-y-0">
          <div className="flex flex-col items-center ">
            <span className="pb-2">Min Value</span>
            <input
              className="border p-2 rounded-xl bg-gray-100 focus:bg-white"
              type="number"
              name="minValue"
              value={minVal}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-center ">
            <span className="pb-2">Max Value</span>
            <input
              className="border p-2 rounded-xl bg-gray-100 focus:bg-white"
              type="number"
              name="maxValue"
              value={maxVal}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-center ">
            <span className="pb-2">Step</span>
            <input
              className="border p-2 rounded-xl bg-gray-100 focus:bg-white"
              type="number"
              name="step"
              value={steps}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
      <div className="w-1/2 pl-2">
        <Slider
          range
          value={[minVal, maxVal]}
          min={minVal}
          max={maxVal}
          step={steps}
          disabled
        />
        <div className="flex items-center justify-between">
          <span>{minVal}</span>
          <span>{maxVal}</span>
        </div>
      </div>
    </div>
  );
};

export default Range;
