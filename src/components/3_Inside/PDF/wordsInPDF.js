// 1.- IMPORTING MODULES
import React, { Component } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import axios from 'axios'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
//2.- IMPORTING OTHER COMPONENTS

//3.- IMPORTING STYLES CSS

const baseURL = process.env.REACT_APP_RUTA_PRINCIPAL;

export default class wordsInPDF extends Component {
    constructor(props) {
        super(props);
        console.log('props',props)
        this.state = {
            info: [],//Here we´ll load the backend´s answer
            //the_path: "/words/noun",
            the_path: this.props.pathWordsInPDF, //Here we'll set the backend´s URL to make the request depending of the king of word
            user: this.props.userForPDF.user,
            kindOfWord: undefined
        };
    }
    printKindOfWords() {
        let path = this.state.the_path;
        if (path === "/words/noun") this.setState({ kindOfWord: "Nouns" });
        if (path === "/words/verb") this.setState({ kindOfWord: "Verbs" });
        if (path === "/words/adjective") this.setState({ kindOfWord: "Adjectives" });
        if (path === "/words/other_word") this.setState({ kindOfWord: "Other Words" });
    }
    UNSAFE_componentWillMount() {
        //console.log(this.props);
        this.printKindOfWords();
    }
    async componentDidMount() {
        //console.log(this.state)
        try {
            console.log(baseURL + this.state.the_path)
            const getting = await axios.get(baseURL + this.state.the_path);
            this.setState({ info: getting.data.result });
            //console.log(this.state.info);
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const styles = StyleSheet.create({
            viewer: {
                width: "100%",
                height: "98vh",
            },
            page: { //LETTER was selected
                flexDirection: 'col',
                background: '#FFFFFF',
                display: "flex",
                margin: 40,
            },
            title: {
                margin: 10,
                fontSize: 24,
                width: 523,
                textAlign: "center"
            },
            section1: {
                margin: 10,
            },
            section2: {
                width: 532,
                flexDirection: 'row',
                marginBottom: 10,
            },
            section3: {
                width: 532,
                flexDirection: 'row',
                //borderColor: '#000000',
                //borderWidth: 1,
                //borderStyle: 'solid',
            },
            wordsNo: {
                width: 60,
                padding: 5,
                margin: 0,
                textAlign: 'center',
                borderLeft: 1,
                borderBottom: 1,
            },
            wordsWord: {
                width: 135,
                padding: 5,
                margin: 0,
                textAlign: 'center',
                borderBottom: 1,
                borderLeft: 1,
            },
            wordsMeaning: {
                width: 202,
                padding: 5,
                margin: 0,
                textAlign: 'center',
                borderRight: 1,
                borderBottom: 1,
                borderLeft: 1,
            },
            line: {
                width: 532,
                borderBottom: 1,
                borderStyle: "solid",
            }
        });
        // Create Document Component
        return (
            <PDFViewer style={styles.viewer}>
                <Document
                    title="Remembre Words in English"
                    author="Jhonatan I Oropeza Mendoza"
                    keywords="nouns, verbs, adjectives, other words">
                    <Page style={styles.page} size="LETTER" title={"Remember Words in English" + this.state.the_path}>
                        <View style={styles.title}>
                            <Text>Remember Words in English</Text>
                        </View>
                        <View style={styles.section1}>
                            <Text>User: {this.state.user.username}</Text>
                            <Text>Email: {this.state.user.email} </Text>
                            <Text>Kind of wors to print: {this.state.kindOfWord}</Text>
                        </View>
                        {/** A Line XD XD */}
                        <View style={styles.line} />
                        <View style={styles.section2}>
                            <View style={styles.wordsNo}>
                                <Text>#No</Text>
                            </View>
                            <View style={styles.wordsWord}>
                                <Text>Word</Text>
                            </View>
                            <View style={styles.wordsWord}>
                                <Text>Track</Text>
                            </View>
                            <View style={styles.wordsMeaning}>
                                <Text>Meaning</Text>
                            </View>
                        </View>
                        {/** A Line XD XD */}
                        <View style={styles.line} />

                        {this.state.info.map((inf, index) => (
                            <View style={styles.section3} key={inf._id}>
                                <View style={styles.wordsNo}>
                                    <Text>{index + 1}</Text>
                                </View>
                                <View style={styles.wordsWord}>
                                    <Text>{inf.word}</Text>
                                </View>
                                <View style={styles.wordsWord}>
                                    <Text>{inf.track}</Text>
                                </View>
                                <View style={styles.wordsMeaning}>
                                    <Text>{inf.meaning}</Text>
                                </View>
                            </View>
                        ))}
                    </Page>
                </Document>
            </PDFViewer>
        )
    }
}
