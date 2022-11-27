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
import DocumentScanner from 'react-native-document-scanner-plugin';
// import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
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
  const [scannedImage, setScannedImage] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    marginTop: 16
  };
  let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/duwneyezm/upload';
  
  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument({
      responseType: "base64"
    })

    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      // set the img src, so we can view the first scanned image
      setScannedImage(scannedImages[0])
    }
  }
  //allows user to upload a photo

  //asks phone for permission to access photos

  const uploadImage = async () => {
    // let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    //this tells the application to give an alert if someone doesn't allow //permission.  It will return to the previous screen.

    // if (permissionResult.granted === false) {
    //   alert('Permission to access camera roll is required!');
    //   return;
    // }

    //This gets image from phone

    let pickerResult = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
      //We need the image to be base64 in order to be formatted for Cloudinary
    });
    console.log("anh", (pickerResult.assets[0].base64).slice(0, 10))
    //this just returns the user to the previous page if they click "cancel"

    // if (pickerResult.cancelled === true) {
    //   return;
    // }

    //sets image from imagePicker to SelectedImage.
    //This is if you are using hooks. The hook for this I have set up as:
    //[selectedImage, setSelectedImage] = useState("").  If you're using //anclass component you can use setState here.  This file format will be
    //a file path to where the image is saved.  

    // setScannedImage(pickerResult[0].uri);

    //***IMPORTANT*** This step is necessary.  It converts image from //file path format that imagePicker creates, into a form that cloudinary //requires. 
    //data:image/jpg;base64,
    let base64Img = `data:image/jpg;base64,${pickerResult.assets[0].base64}`;

    // Here we need to include your Cloudinary upload preset with can be //found in your Cloudinary dashboard. 

    let data = {
      "file": base64Img,
      "upload_preset": "app_scan",
    }

    //sends photo to cloudinary
    //**I initially tried using an axios request but it did NOT work** I was 
    //not able to get this to work until I changed it to a fetch request.

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      console.log("clo", data.url)
      setImageUpload(data.url)
      //Here I'm using another hook to set State for the photo that we get back //from Cloudinary
      // console.log("clo",data.url )
      // setPhoto(data.url);
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
  console.log("file", filePDF)
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
          <Header />
          {/* Thong tin chung */}
          <View style={styles.bodyApp}>
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
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
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
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
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
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
              <Button
                onPress={uploadPDF}
                title="Upload PDF Document"
              />
            </View>
            <View style={styles.container}>
              <Button
                onPress={uploadImage}
                title="Upload Image"
              />
            </View>
            <View style={styles.container}>
              <Button
                onPress={scanDocument}
                title="Scan Document"
              />
            </View>
          </View>

          <View>
            {filePDF && <Text>{filePDF}</Text>}
          </View>

          <View>
            <Image source={{ uri: imageUpload }} style={{ width: 150, height: 150 }} />
          </View>


        </ScrollView>
      </SafeAreaView>
    </GlobalProvider>
  );
};

const styles = StyleSheet.create({
  bodyApp: {
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16
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
    marginTop: 16,
    display: "flex",
    justifyContent: "space-around"
  },
  container: {

    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

export default App;
