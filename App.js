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
  const [singleFile, setSingleFile] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  console.log("singleFile", singleFile);
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
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Text>Title</Text>
            <View style={[
              styles.wrapper,
              // { alignItems: icon ? 'center' : 'baseline' },
              // { borderColor: getBorderColor(), flexDirection: getFlexDirection() },
              // styleBoxInput
            ]}>
              {/* { <View>{icon}</View>} */}
              <TextInput
                style={[styles.textInput]}
              // onChangeText={onChangeText}
              // value={value}
              // onFocus={() => setFocused(true)}
              // onBlur={() => setFocused(false)}
              // {...props}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Text>Author</Text>
            <View style={[
              styles.wrapper,
              // { alignItems: icon ? 'center' : 'baseline' },
              // { borderColor: getBorderColor(), flexDirection: getFlexDirection() },
              // styleBoxInput
            ]}>
              {/* { <View>{icon}</View>} */}
              <TextInput
                style={[styles.textInput]}
              // onChangeText={onChangeText}
              // value={value}
              // onFocus={() => setFocused(true)}
              // onBlur={() => setFocused(false)}
              // {...props}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Text>Year</Text>
            <View style={[
              styles.wrapper,
              // { alignItems: icon ? 'center' : 'baseline' },
              // { borderColor: getBorderColor(), flexDirection: getFlexDirection() },
              // styleBoxInput
            ]}>
              {/* { <View>{icon}</View>} */}
              <TextInput
                style={[styles.textInput]}
              // onChangeText={onChangeText}
              // value={value}
              // onFocus={() => setFocused(true)}
              // onBlur={() => setFocused(false)}
              // {...props}
              />
            </View>
          </View>
          <View style={styles.container}>
            <Button
              onPress={async () => {
                try {
                  const file = await DocumentPicker.pick({
                    type: [DocumentPicker.types.pdf],
                    copyTo: 'documentDirectory',
                  });
                  setSingleFile(
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
              }}
              title="Open a PDF Document..."
            />
          </View>
          <View>
            {singleFile && <Text>av {singleFile}</Text>}
          </View>
          {/* <View>
            <Pdf
              source={singleFile}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf} />
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </GlobalProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 42,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginTop: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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
