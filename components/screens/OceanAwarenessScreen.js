import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const OceanAwarenessScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigation = useNavigation();

  const categories = [
    { id: 'all', name: 'All', icon: 'apps' },
    { id: 'facts', name: 'Ocean Facts', icon: 'info' },
    { id: 'threats', name: 'Threats', icon: 'warning' },
    { id: 'solutions', name: 'Solutions', icon: 'lightbulb' },
    { id: 'species', name: 'Marine Life', icon: 'pets' },
  ];

  const articles = [
    {
      id: 1,
      title: 'The Great Pacific Garbage Patch',
      category: 'threats',
      readTime: '5 min read',
      author: 'Dr. Sarah Johnson',
      date: 'Jan 15, 2024',
      summary: 'Understanding the massive accumulation of plastic waste in our oceans and its impact on marine ecosystems.',
      image: 'garbage-patch',
      featured: true,
    },
    {
      id: 2,
      title: 'Coral Reef Restoration Techniques',
      category: 'solutions',
      readTime: '7 min read',
      author: 'Marine Biologist Team',
      date: 'Jan 12, 2024',
      summary: 'Innovative methods being used to restore damaged coral reefs around the world.',
      image: 'coral-restoration',
      featured: false,
    },
    {
      id: 3,
      title: 'Amazing Deep Sea Creatures',
      category: 'species',
      readTime: '4 min read',
      author: 'Ocean Explorer',
      date: 'Jan 10, 2024',
      summary: 'Discover the fascinating and mysterious creatures that live in the ocean depths.',
      image: 'deep-sea',
      featured: false,
    },
    {
      id: 4,
      title: 'Ocean Acidification: The Silent Threat',
      category: 'threats',
      readTime: '6 min read',
      author: 'Climate Scientist',
      date: 'Jan 8, 2024',
      summary: 'How increasing CO2 levels are making our oceans more acidic and threatening marine life.',
      image: 'acidification',
      featured: true,
    },
    {
      id: 5,
      title: 'Sustainable Fishing Practices',
      category: 'solutions',
      readTime: '5 min read',
      author: 'Fisheries Expert',
      date: 'Jan 5, 2024',
      summary: 'How responsible fishing can help maintain healthy fish populations and ocean ecosystems.',
      image: 'sustainable-fishing',
      featured: false,
    },
    {
      id: 6,
      title: 'The Ocean\'s Role in Climate Regulation',
      category: 'facts',
      readTime: '8 min read',
      author: 'Oceanographer',
      date: 'Jan 3, 2024',
      summary: 'Understanding how the ocean acts as Earth\'s climate regulator and carbon sink.',
      image: 'climate-regulation',
      featured: false,
    },
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);

  const readArticle = (articleId) => {
    console.log('Read article:', articleId);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#171836" />

      {/* Gradient header */}
      <LinearGradient colors={["#1A1A32", "#635EFC"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerDecor}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="chevron-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.userPillWrapHeader}>
            <View style={styles.userPillHeader}>
              <Text style={styles.pillHiHeader}>Hi ,<Text style={styles.pillNameHeader}> Yenula</Text></Text>
              <Text style={styles.pillEmailHeader}>yenula123@gmail.com</Text>
            </View>
            <View style={styles.avatarCircleHeader}>
              <MaterialIcons name="person" size={18} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* Large title card */}
        <View style={styles.titleCardWrap}>
          <View style={styles.titleCard}>
            <Text style={styles.titleMain}>Ocean <Text style={styles.titleAccent}>Awareness</Text></Text>
            <Text style={styles.titleSub}>Discover the truth about our oceans</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.articlesWrap}>
          {filteredArticles.map((article) => (
            <View key={article.id} style={styles.articleCardWhite}>
              <View style={styles.articleRow}>
                <View style={styles.articleIconBox}>
                  <MaterialIcons name="article" size={20} color="#111827" />
                </View>
                <View style={styles.articleTextWrap}>
                  <Text style={styles.articleTitleNew}>{article.title}</Text>
                  <Text style={styles.articleSummaryNew}>{article.summary}</Text>
                </View>
              </View>
              <View style={styles.articleFooter}>
                <TouchableOpacity style={styles.learnMoreBtn} onPress={() => readArticle(article.id)}>
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerDecor: {
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPillWrapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 22,
    paddingRight: 8,
  },
  userPillHeader: {
    paddingHorizontal: 12,
  },
  pillHiHeader: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  pillNameHeader: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  pillEmailHeader: { color: '#E5E7EB', fontSize: 10 },
  avatarCircleHeader: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  titleCardWrap: {
    marginTop: 6,
    alignItems: 'center',
  },
  titleCard: {
    width: '92%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
    alignItems: 'flex-start',
  },
  titleMain: { fontSize: 24, fontWeight: '700', color: '#111827' },
  titleAccent: { color: '#5145E5' },
  titleSub: { marginTop: 8, color: '#6B7280' },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 18,
  },
  articlesWrap: {
    paddingBottom: 40,
  },
  articleCardWhite: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  articleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  articleIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  articleTextWrap: { flex: 1 },
  articleTitleNew: { fontSize: 16, fontWeight: '700', color: '#111827' },
  articleSummaryNew: { fontSize: 13, color: '#6B7280', marginTop: 6 },
  articleFooter: { marginTop: 12, alignItems: 'flex-start' },
  learnMoreBtn: { backgroundColor: '#111827', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  learnMoreText: { color: '#FFFFFF', fontWeight: '600' },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginLeft: 20,
    marginRight: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImageContainer: {
    height: 150,
    position: 'relative',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  featuredSummary: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredReadTime: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  featuredDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  articleSummary: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 8,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  articleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTimeText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
    marginRight: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default OceanAwarenessScreen;
