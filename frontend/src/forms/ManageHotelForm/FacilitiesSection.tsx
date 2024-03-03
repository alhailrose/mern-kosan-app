import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Facilites</h2>
      <div className='grid grid-cols-5 gap-2'>
        {hotelFacilities.map((facility) => (
          <label className='text-sm flex gap-1 text-gray-700'>
            <input
              type='checkbox'
              value={facility}
              {...register("facilities", {
                validate: (facilties) => {
                  if (facilties && facilties.length > 0) {
                    return true;
                  } else {
                    return "At least one facility must be selected";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className='text-red-500 text-sm font-bold'>
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
