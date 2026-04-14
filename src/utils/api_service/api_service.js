import axios from "axios";
import { PincodeApiResponse } from "../../models/countryCodemodel/countryCodeResponse";

class ApiService {

    fetchCityandStateList = async (pincode) => {

        try {

            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

            console.log("calling pincode 2");
            const pincodeResonse = new PincodeApiResponse(response.data);
            console.log("pincode response message:", pincodeResonse?.data[0]?.message);
            console.log("pincode response status:", pincodeResonse?.data[0]?.status);
            console.log("pincode response district:", pincodeResonse?.data[0]?.postOffices[0]?.district);
            console.log("pincode response state:", pincodeResonse?.data[0]?.postOffices[0]?.state);
            return {
                district: pincodeResonse?.data[0]?.postOffices[0]?.district,
                state: pincodeResonse?.data[0]?.postOffices[0]?.state ?? '',
            };

        } catch (error) {
            return {};
        }

    };
}

export default new ApiService();