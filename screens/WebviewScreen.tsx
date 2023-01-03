import {WebView} from "react-native-webview"


export const WebViewScreen = (props:any)=>{
  console.log(props.route.params);
  return(
    <WebView source={{uri:props.route.params.url}}/>
  )
}