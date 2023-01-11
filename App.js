/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import GlobalProvider from './src/context/Provider';
import DocumentPicker from 'react-native-document-picker';
import DocumentScanner, { ResponseType } from 'react-native-document-scanner-plugin';
// import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import SelectDropdown from 'react-native-select-dropdown'
// import Pdf from 'react-native-pdf';
// import PSPDFKitView from 'react-native-pspdfkit';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [filePDF, setFilePDF] = useState(null);
  const [scannedImage, setScannedImage] = useState([]);
  // const [scannedImage2, setScannedImage2] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const backgroundStyle = {
    backgroundColor: Colors.white,
    marginTop: 16
  };
  let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/duwneyezm/upload';

  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument({
      // responseType: ResponseType["Base64"]
    })
    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      ImgToBase64.getBase64String(`${scannedImages[0]}`)
        .then(base64String => {
          let base64Img = `data:image/jpg;base64,${base64String}`;
          let data = {
            "file": base64Img,
            "upload_preset": "app_scan",
          };
          fetch(CLOUDINARY_URL, {
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
          }).then(async r => {
            let data = await r.json();

            // setImageUpload(data.url)
            //Here I'm using another hook to set State for the photo that we get back //from Cloudinary
            // console.log("clo",data.url )
            setScannedImage([...scannedImage, data.url])
            // setPhoto(data.url);
          }).catch(err => console.log(err))
        })
        .catch(err => console.log(err));
    }
  }
  //allows user to upload a photo

  //asks phone for permission to access photos

  const uploadImage = async () => {
    let pickerResult = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
      //We need the image to be base64 in order to be formatted for Cloudinary
    });
    let base64Img = `data:image/jpg;base64,${pickerResult.assets[0].base64}`;

    // Here we need to include your Cloudinary upload preset with can be //found in your Cloudinary dashboard. 
    let data = {
      "file": base64Img,
      "upload_preset": "app_scan",
    }
    //sends photo to cloudinary
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      // console.log("clo", data.url)
      setScannedImage([...scannedImage, data.url])
    }).catch(err => console.log(err))
  };
  const uploadPDF = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'documentDirectory',
      });
      setFilePDF(
        // file
        decodeURI(
          file[0].fileCopyUri
          // .replace('file://', ''),
        )
      )
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // The user canceled the document picker.
      } else {
        throw error;
      }
    }
  }
  const typeUpImage = ["UPLOAD IMAGES", "SCAN DOCUMENT"]
  return (
    <GlobalProvider >
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          {/* <Header /> */}
          <Text style={styles.titleHeader}>App Scan</Text>
          {/* Thong tin chung */}
          <View>
            <View
              style={styles.bodyApp}>
              <Text style={[styles.lable]}>Title</Text>
              <View style={[
                styles.wrapper,
              ]}>
                <TextInput
                  style={[styles.textInput]}
                  onChangeText={(e) => setTitle(e)}
                  value={title}
                />
              </View>
            </View>
            <View
              style={styles.bodyApp}>
              <Text style={[styles.lable]}>Author</Text>
              <View style={[
                styles.wrapper,
              ]}>
                <TextInput
                  style={[styles.textInput]}
                  onChangeText={(e) => setAuthor(e)}
                  value={author}
                />
              </View>
            </View>
            <View
              style={styles.bodyApp}>
              <Text style={[styles.lable]}>Year</Text>
              <View style={[
                styles.wrapper
              ]}>
                <TextInput
                  style={[styles.textInput]}
                  onChangeText={(e) => setYear(e)}
                  value={year}
                />
              </View>
            </View>
          </View>

          {/* Scan or upload Image or pdf */}
          <View style={styles.action}>
            <View style={styles.container}>
                <TouchableOpacity
                  onPress={uploadImage}
                  style={styles.btn}
                  >
                  <Text style={styles.textSelect}>UPLOAD IMAGES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                  onPress={scanDocument}
                  style={styles.btn}
                  >
                  <Text style={styles.textSelect}>SCAN DOCUMENTS</Text>
                </TouchableOpacity>
            </View>

            {/* <SelectDropdown
              data={typeUpImage}
              onSelect={(selectedItem, index) => {
                if (index == 0) {
                  uploadImage()
                }
                if (index == 1) {
                  scanDocument()
                }
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              renderDropdownIcon={(selectedItem, index) => {

              }}
              dropdownIconPosition="right"
              buttonStyle={styles.btnSelect}
              buttonTextStyle={styles.textSelect}
            /> */}
          </View>
          <View style={styles.viewImages}>
            {
              (scannedImage && scannedImage.length > 0) ? (
                scannedImage.map((itemI, index) => {
                  console.log("itemI", itemI)
                  return (
                    <View key={index}>
                      <Image source={{ uri: `${itemI}` }} style={{ width: 150, height: 150 }} />
                    </View>
                  )
                })
              ) : null
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </GlobalProvider>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: '900'
  },
  bodyApp: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
    backgroundColor: Colors.white,
  },
  lable: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16
  },
  wrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginTop: 5
  },
  action: {
    marginTop: 48,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.white,
  },
  container: {

    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  textInput: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    paddingVertical: 12
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  btn: {
    paddingLeft: 14,
    paddingBottom: 14,
    paddingTop: 14,
    paddingRight: 14,
    fontSize: 18,
    backgroundColor: "#16a5e1",
  },
  btnSelect: {
    backgroundColor: "#16a5e1",
  },
  textSelect: {
    color: "white",
    fontSize: 18
  },
  viewImages: {
    marginTop: 24,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16
  }
});

export default App;
