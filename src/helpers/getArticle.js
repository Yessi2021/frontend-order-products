import axios from "axios";



export const getData = async () => {
    try {
      return await axios.get('http://localhost:4000/api')
    //   setData(response.data.datos);
      // console.log(response.data.datos);

    } catch (error) {
        console.log(error);
    }

  }
