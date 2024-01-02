import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ViewLoginMail = ({route}) => {
    const { url } = route.params;

    const extractPaymentStatusFromUrl = (url) => {
        // Xử lý và trích xuất thông tin trạng thái thanh toán từ URL
        // Ví dụ: Kiểm tra xem URL có chứa 'vnp_ResponseCode=00' hay không
        return url.includes('vnp_ResponseCode=00') ? 'success' : 'failure';
    };


    const handleWebViewNavigation = (navState) => {
        // try {
                  
        //     const returnedUrl = navState.url;

        //     if (returnedUrl.includes('vnp_ResponseCode')) {
        //         const paymentStatus = extractPaymentStatusFromUrl(returnedUrl);
        //         //navigation.navigate('PaymentResult', { status: paymentStatus });
        //     } else {
        //         console.log("nonsucess");
        //     }
        // } catch (error) {
        //     console.log(error);
        // }

    };

  return (
    <View style={styles.container}>
            <WebView
                source={{ uri: url }}
                style={styles.webView}
                // onNavigationStateChange={handleWebViewNavigation}
            />
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        flex: 1,
    },
});

export default ViewLoginMail