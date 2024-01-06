import { View, StyleSheet, LogBox } from 'react-native'
import React, { useState } from 'react'
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native';

const WebViewScreen = ({ route }) => {
    const { url } = route.params;
    LogBox.ignoreLogs(['Encountered an error loading page']);

    const navigation = useNavigation();


    const handleReturnedUrl = (returnedUrl) => {
        // Xử lý returnedUrl để lấy thông tin cần thiết


        // Cập nhật trạng thái đơn hàng hoặc thanh toán trong hệ thống của bạn
        updateOrderStatus(orderId, paymentStatus);

        // Hiển thị thông báo cho người dùng
        if (paymentStatus === 'failure') {
            alert('Thanh toán thất bại. Vui lòng thử lại.');
        }
    };

    const extractPaymentStatusFromUrl = (url) => {
        // Xử lý và trích xuất thông tin trạng thái thanh toán từ URL
        // Ví dụ: Kiểm tra xem URL có chứa 'vnp_ResponseCode=00' hay không
        return url.includes('vnp_ResponseCode=00') ? 'success' : 'failure';
    };


    const handleWebViewNavigation = (navState) => {
        try {
                  
            const returnedUrl = navState.url;

            if (returnedUrl.includes('vnp_ResponseCode')) {
                const paymentStatus = extractPaymentStatusFromUrl(returnedUrl);
                navigation.navigate('PaymentResult', { status: paymentStatus });
            } else {
                console.log("nonsucess");
            }
        } catch (error) {
            console.log(error);
        }

    };
    // const handleWebViewNavigation = (navState) => {
    //     try {
    //         const returnedUrl = navState.url;
    //         console.log('Returned URL:', returnedUrl);
    
    //         if (navState.loading) {
    //             // The WebView is still loading, no need to handle anything yet
    //             return;
    //         }
    
    //         if (navState.error) {
    //             // Check for specific error conditions and handle them
    //             if (navState.error.domain === 'NSURLErrorDomain' && navState.error.code === -1004) {
    //                 // Ignore the error caused by the inability to connect to the server
    //                 return;
    //             }
    
    //             // Handle other errors if needed
    //             console.error('WebView error:', navState.error);
    //             return;
    //         }
    
    //         // Handle successful navigation
    //         if (returnedUrl.includes('vnp_ResponseCode')) {
    //             const paymentStatus = extractPaymentStatusFromUrl(returnedUrl);
    //             navigation.navigate('PaymentResult', { status: paymentStatus });
    //         } else {
    //             console.log("nonsuccess");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: url }}
                style={styles.webView}
                onNavigationStateChange={handleWebViewNavigation}
                
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

export default WebViewScreen