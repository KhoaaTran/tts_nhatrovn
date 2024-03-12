import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SignatureScreen from "react-native-signature-canvas";
// import Signature, { SignatureViewRef } from 'react-native-signature-canvas';
import { Pressable, Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import { COLORS, SIZE } from '../../constants';
import { Platform } from 'react-native';
import { BASE_URL } from '../../services/config'
import { GuestService } from '../../services';
import { SPINNER, UIText } from '../atoms';
import FastImage from 'react-native-fast-image'
import { UIHeader } from '../organisms';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const SignModal = ({
    closeModal, value_key = '', value_type = ''
}) => {
    const [signatureOLD, setSignatureOLD] = useState(null);
    const [signatureValue, setSignatureValue] = useState(null);
    const [isScrollEnabled, setScrollEnabled] = useState(false)
    const [isNew, setNew] = useState(false)
    const ref = useRef();

    const [isLoading, setLoading] = useState(false);

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        setSignatureValue(null)
        ref.current?.clearSignature()
    };

    const handleSignature = (signature) => {
        console.log(signature);
        setSignatureValue(signature)
    };

    const handleOK = () => {
        // console.log(signatureValue);
        // onOK(signature); // Callback from Component props    
    }

    // Called after ref.current.getData()
    const handleData = (data) => {
        // console.log('handleData', data);
    };

    // Called after end of stroke
    const handleEnd = () => {
        ref.current.readSignature();
    };

    const changeSigned = () => {
        setSignatureOLD(null)
        setNew(boo => !boo)
    }


    // Called after ref.current.readSignature() reads a non-empty base64 string
    // const handleOK = (signature) => {
    //     console.log(signature);
    //     // onOK(signature); // Callback from Component props
    // };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        // console.log("Empty");
    };

    const onClearButtonPress = () => {
        setScrollEnabled(true)
        setSignatureValue("")
        ref.current?.clearSignature()
    }

    const webStyle = `
        .m-signature-pad--body {
            position: absolute;
            bottom: 0px;
            top: 0px;
            left: 0px;
            right: 0px;
            border: none;
        }
        .m-signature-pad--footer
            .button.clear {
                display: none
            }
            .button.save {
                display: none
            }
        .m-signature-pad--footer {
            display: none
        }
    `;

    useEffect(() => {
        let url = '';
        switch (value_type) {
            default:
                url = `/image-sign-customer-sale-room/${value_key}`
                break;
        }
        if ('' != value_key && '' != url) {
            setLoading(true)
            GuestService.getData(url)
                .then((res) => {
                    if (null != res.data && '' != res.data) {
                        setNew(false)
                        setSignatureOLD(res.data)
                    } else {
                        setNew(true)
                    }
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <UIHeader title={'SIGNATURE'} titleCenter={true} />
            <View style={{
                // height: HEIGHT,
                // width: WIDTH,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'rgba(0,0,0,0.5)',
                backgroundColor: 'white',
            }}>

                {
                    isLoading ?
                        <SPINNER /> :
                        (
                            <>
                                <ScrollView scrollEnabled={isScrollEnabled} contentContainerStyle={styles.container}>
                                    <View style={[styles.signatureWrapper, { height: HEIGHT * 0.35, width: windowWidth - 20 }]}>
                                        {
                                            !isNew && (
                                                <FastImage
                                                    source={{ uri: signatureOLD }}
                                                    resizeMode={FastImage.resizeMode.contain}
                                                    style={{ height: '100%' }}
                                                />
                                            )
                                        }
                                        {
                                            isNew && (
                                                <SignatureScreen
                                                    ref={ref}
                                                    onOK={handleSignature}
                                                    onEnd={handleEnd}
                                                    onGetData={handleData}
                                                    onEmpty={handleEmpty}
                                                    autoClear={false}
                                                    imageType={"image/*"}
                                                    // dataURL={`${BASE_URL}/image-sign-customer-sale-room/1212`}
                                                    // dataURL={signatureValue}
                                                    webStyle={`             
                            .m-signature-pad {
                                position: fixed;
                                margin:auto; 
                                top: 0; 
                                width:100%;
                                height:100%
                            }
                            body,html { 
                                position:relative; 
                            }
                        `}
                                                />
                                            )
                                        }

                                    </View>
                                    {!isNew && (
                                        <View style={{ flexDirection: 'row', gap: 10, paddingBottom: 0 }}>
                                            <Pressable
                                                style={{ backgroundColor: COLORS.orange, padding: 10, flex: 1, marginVertical: 10, borderRadius: 20, }}
                                                onPress={() => { changeSigned() }}
                                            >
                                                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: SIZE.size15, }}>Thay đổi chữ ký</Text>
                                            </Pressable>

                                        </View>
                                    )
                                    }
                                    {isNew && (
                                        <>
                                            <View style={{ flexDirection: 'row', gap: 10, paddingBottom: 0 }}>
                                                <Pressable
                                                    style={{ backgroundColor: COLORS.orange, padding: 10, flex: 1, marginVertical: 10, borderRadius: 20, }}
                                                    onPress={() => { handleClear() }}
                                                >
                                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: SIZE.size15, }}>Xóa chữ ký</Text>
                                                </Pressable>
                                                <Pressable
                                                    disabled={signatureValue == null || signatureValue == ''}
                                                    style={{
                                                        padding: 10, flex: 1, marginVertical: 10, borderRadius: 20,
                                                        backgroundColor: signatureValue == null || signatureValue == '' ? COLORS.grey : COLORS.primary,
                                                    }}
                                                    onPress={() => { handleOK() }}
                                                >
                                                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: SIZE.size15, }}>Lưu chữ ký</Text>
                                                </Pressable>
                                            </View>
                                        </>
                                    )}

                                    <View style={{ flexDirection: 'row', gap: 10, paddingBottom: Platform.OS === 'ios' ? 10 : 0, paddingTop: 10 }}>
                                        <Pressable
                                            style={{ backgroundColor: COLORS.primary, padding: 10, flex: 1, marginVertical: 0, borderRadius: 20, }}
                                            onPress={() => { closeModal(false) }}
                                        >
                                            <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: SIZE.size15, }}>Đóng</Text>
                                        </Pressable>

                                    </View>
                                </ScrollView>
                            </>
                        )
                }

            </View>
        </SafeAreaView>
    )


}

export default SignModal

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signatureWrapper: {
        padding: 2,
        borderWidth: 2,
        borderRadius: 10
    },
    bottomButtons: {
        alignItems: 'center'
    },
    transparentButton: {
        paddingTop: 7,
        paddingBottom: 11,
        marginTop: 14,
        marginBottom: 10
    },
    text: {
        paddingTop: 12,
        paddingBottom: 15,
        color: "#1f2229",
        fontSize: 15
    }
})

{/* <SignatureScreen
                        ref={ref}
                        // bgSrc="https://via.placeholder.com/300x200/ff726b"
                        backgroundColor={COLORS.bgcolor}
                        onEnd={handleEnd}
                        onOK={handleOK}
                        onEmpty={handleEmpty}
                        onClear={handleClear}
                        onGetData={handleData}
                        autoClear={false}
                        descriptionText={'Nhập chữ ký của bạn'}
                    // clearText={'Xóa'}
                    // confirmText={'Xác nhận'}
                    ></SignatureScreen> */}

{/* <SignatureScreen
                        ref={ref}
                        onOK={handleSignature}
                        webStyle={webStyle}
                        trimWhitespace={true}
                        onBegin={() => setScrollEnabled(false)}
                        onEnd={() => {
                            ref.current?.readSignature();
                            setScrollEnabled(true)
                        }}
                    /> */}


// return (
//     <View style={styles.containerSlide}>
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={[styles.signatureWrapper, { height: WIDTH, aspectRatio: 1 }]}>
//                 <SignatureScreen
//                     ref={ref}
//                     // bgSrc="https://via.placeholder.com/300x200/ff726b"
//                     backgroundColor={COLORS.bgcolor}
//                     onEnd={handleEnd}
//                     onOK={handleOK}
//                     onEmpty={handleEmpty}
//                     onClear={handleClear}
//                     onGetData={handleData}
//                     autoClear={false}
//                     descriptionText={'Nhập chữ ký của bạn'}
//                 // clearText={'Xóa'}
//                 // confirmText={'Xác nhận'}
//                 ></SignatureScreen>
//             </View>
//             <View style={styles.bottomButtons}>
//                 <Pressable style={styles.transparentButton}  >
//                     <Text>clear signature</Text>
//                 </Pressable>
//             </View>
//             <View style={{ height: 500 }}>
//                 <Text>White space</Text>
//             </View>
//         </ScrollView>

//     </View>
// )

// const styles = StyleSheet.create({
//     containerSlide: {
//         height: HEIGHT,
//         width: WIDTH,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     container: {
//         // padding: 20,
//         flex: 1,
//     },
//     containerSlide: {
//         height: HEIGHT,
//         width: WIDTH,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },

//     signatureWrapper: {
//         padding: 2,
//         borderWidth: 2,
//         borderRadius: 10
//     },
// })
