import {ActivityIndicator} from 'react-native';

const CustomActivityIndicator = () => {
   return (
        <ActivityIndicator
            animating={true}
            color="#84888d"
            size="large"
            hidesWhenStopped={true}
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }} />
   );
};

export default CustomActivityIndicator;
