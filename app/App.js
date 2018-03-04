import React, { Component } from "react";
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Image,
   ListView
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Dropdown } from "react-native-material-dropdown";

const BASE_URL = "http://29599177.ngrok.io";
const TEAM_ID = 0;

// FIXME: ultimately jank
let forceUpdate;

function generateSampleData() {
   let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
   let bots = [];
   for (let i = 0; i < 3; i++) {
      bots.push({
         team: i < 3 ? 0 : 1,
         botId: i,
         directives: [
            { priority: 0, name: "move" },
            { priority: 1, name: "attack" },
            { priority: 2, name: "evade" }
         ]
      });
   }
   return ds.cloneWithRows(bots);
}

const BotItem = props => (
   <TouchableOpacity
      onPress={() => props.onPress(props.item)}
      style={styles.BotItem}
   >
      <Image
         style={styles.BotItem__Image}
         source={{
            uri:
               "https://cdn1.iconfinder.com/data/icons/modern-future-technology/128/circuit-board-2-128.png"
         }}
      />
      <View style={{ flex: 1 }}>
         <Text style={{ fontWeight: "bold" }}>Bot {props.item.botId}</Text>
         <View style={{ marginBottom: 5 }}>
            <Text style={{ color: "rgb(9, 213, 121)", fontSize: 12 }}>
               ●&nbsp;<Text style={{ color: "#9a9a9a", fontSize: 10 }}>
                  Online
               </Text>
            </Text>
         </View>
         <View
            style={{
               alignSelf: "stretch",
               backgroundColor: "rgb(9, 213, 121)",
               borderRadius: 4,
               height: 8,
               borderWidth: 1,
               borderColor: "#fafafa",
               marginBottom: 5
            }}
         />
         <View
            style={{
               flexDirection: "row",
               justifyContent: "flex-start"
            }}
         >
            {props.item.directives
               .sort((x, y) => x.priority < y.priority)
               .map((x, i) => (
                  <View
                     key={i}
                     style={{
                        paddingVertical: 5
                     }}
                  >
                     <Text style={{ fontSize: 11 }}>{`\t${i + 1}. ${
                        x.name
                     }\n`}</Text>
                  </View>
               ))}
         </View>
      </View>
   </TouchableOpacity>
);

class BotList extends Component {
   static navigationOptions = {
      title: "Available Bots",
      headerStyle: {
         backgroundColor: "rgb(0, 94, 255)",
         borderBottomColor: "transparent"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
         fontSize: 22
      }
   };

   state = {
      bots: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
   };

   componentWillMount() {
      this.executeQuery();
   }

   constructor(props) {
      super(props);
      forceUpdate = this.executeQuery.bind(this);
   }

   executeQuery() {
      fetch(`${BASE_URL}/bot/${TEAM_ID}`)
         .then(response => response.json())
         .then(responseJson => {
            this.setState({
               bots: this.state.bots.cloneWithRows(responseJson.bots)
            });
         })
         .catch(err => console.log(err));
   }

   itemPressed = item => {
      this.props.navigation.navigate("EditBot", { ...item });
   };

   render() {
      return (
         <View style={styles.container}>
            <ListView
               style={styles.BotList}
               dataSource={this.state.bots}
               renderRow={item => (
                  <BotItem onPress={this.itemPressed} item={item} />
               )}
            />
         </View>
      );
   }
}

const DIRECTIVES = [
   "directive 1",
   "directive 2",
   "directive 3",
   "directive 4",
   "directive 5"
];

class EditBot extends Component {
   static navigationOptions = {
      title: "Change Directives",
      headerStyle: {
         backgroundColor: "rgb(0, 94, 255)",
         borderBottomColor: "transparent"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
         fontSize: 22
      }
   };

   state = {
      priority0: "",
      priority1: "",
      priority2: ""
   };

   getDirectives() {
      const currentValues = Object.values(this.state);
      return DIRECTIVES.filter(x => {
         return currentValues.indexOf(x) === -1;
      }).map(x => ({ value: x }));
   }

   onChangeText = (key, value) => {
      this.setState({ [key]: value });
   };

   updateDirectives = () => {
      const { botId } = this.props.navigation.state.params;
      fetch(`${BASE_URL}/directives/${botId}`, {
         method: "POST",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            directives: [
               { priority: 0, name: this.state.priority0 },
               { priority: 1, name: this.state.priority1 },
               { priority: 2, name: this.state.priority2 }
            ]
         })
      })
         .then(() => {
            forceUpdate();
            this.props.navigation.goBack();
         })
         .catch(err => {
            console.log(err);
         });
   };

   render() {
      return (
         <View style={[styles.container, { padding: 15 }]}>
            <Text style={{ marginBottom: 15 }}>Update Bot Directives</Text>
            <Dropdown
               label="Priority 1"
               data={this.getDirectives()}
               value={this.state.priority0}
               onChangeText={value => this.onChangeText("priority0", value)}
            />
            <Dropdown
               label="Priority 2"
               data={this.getDirectives()}
               value={this.state.priority1}
               onChangeText={value => this.onChangeText("priority1", value)}
            />
            <Dropdown
               label="Priority 3"
               data={this.getDirectives()}
               value={this.state.priority2}
               onChangeText={value => this.onChangeText("priority2", value)}
            />
            <TouchableOpacity
               style={styles.SubmitButton}
               onPress={this.updateDirectives}
            >
               <Text style={{ color: "#fff", textAlign: "center" }}>
                  Update
               </Text>
            </TouchableOpacity>
         </View>
      );
   }
}

export default StackNavigator({
   BotList: { screen: BotList },
   EditBot: { screen: EditBot }
});

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fafafa"
   },
   BotList: {
      marginTop: 10
   },
   BotItem: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: "row",
      elevation: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      borderWidth: 1,
      borderColor: "rgb(195, 217, 236)"
   },
   BotItem__Image: {
      height: 75,
      width: 75,
      marginRight: 20
   },
   SubmitButton: {
      marginTop: 20,
      backgroundColor: "rgb(0, 94, 255)",
      paddingHorizontal: 15,
      paddingVertical: 10
   }
});
