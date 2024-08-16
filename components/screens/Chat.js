import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const messages = [
  { id: '1', text: 'Hello!', sender: 'user' },
  { id: '2', text: 'Hi there! How are you?', sender: 'friend' },
  { id: '3', text: 'I’m good, thanks! How about you?', sender: 'user' },
];

const MessageBubble = ({ text, sender }) => {
  const isUser = sender === 'user';
  return (
    <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.friendBubble]}>
      <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.friendMessageText]}>
        {text}
      </Text>
    </View>
  );
};

const Chat = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeIcon}>
          <Icon name="home" color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Message</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble text={item.text} sender={item.sender} />
        )}
        contentContainerStyle={styles.messageContainer}
      />

      <View style={styles.footer}>
        <TextInput style={styles.input} placeholder="Type a message..." />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    height: 60,
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    Top: 20,
  },
  homeIcon: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageContainer: {
    padding: 10,
    paddingBottom: 80, // Space for the input area
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  userBubble: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  friendBubble: {
    backgroundColor: '#e1e1e1',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  friendMessageText: {
    color: '#333', // Dark gray color for friend messages
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chat;
