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

const { width } = Dimensions.get('window');

const OceanAwarenessScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ocean Awareness</Text>
        <Text style={styles.subtitle}>Learn about our oceans and how to protect them</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Articles */}
        {selectedCategory === 'all' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Articles</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {featuredArticles.map((article) => (
                <TouchableOpacity
                  key={article.id}
                  style={styles.featuredCard}
                  onPress={() => readArticle(article.id)}
                >
                  <View style={styles.featuredImageContainer}>
                    {/* Image 12 goes here - Article image */}
                    <View style={styles.imagePlaceholder}>
                      <MaterialIcons name="article" size={40} color="#FFFFFF" />
                      <Text style={styles.placeholderText}>{article.image}</Text>
                    </View>
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredBadgeText}>FEATURED</Text>
                    </View>
                  </View>
                  <View style={styles.featuredContent}>
                    <Text style={styles.featuredTitle}>{article.title}</Text>
                    <Text style={styles.featuredSummary}>{article.summary}</Text>
                    <View style={styles.featuredMeta}>
                      <Text style={styles.featuredReadTime}>{article.readTime}</Text>
                      <Text style={styles.featuredDate}>{article.date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <MaterialIcons 
                  name={category.icon} 
                  size={20} 
                  color={selectedCategory === category.id ? '#FFFFFF' : '#6B7280'} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Articles List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
          </Text>
          {filteredArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => readArticle(article.id)}
            >
              <View style={styles.articleImageContainer}>
                {/* Image 13 goes here - Article image */}
                <View style={styles.imagePlaceholder}>
                  <MaterialIcons name="article" size={30} color="#FFFFFF" />
                  <Text style={styles.placeholderText}>{article.image}</Text>
                </View>
              </View>
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleSummary}>{article.summary}</Text>
                <View style={styles.articleMeta}>
                  <View style={styles.articleAuthor}>
                    <MaterialIcons name="person" size={14} color="#6B7280" />
                    <Text style={styles.authorText}>{article.author}</Text>
                  </View>
                  <View style={styles.articleInfo}>
                    <Text style={styles.readTimeText}>{article.readTime}</Text>
                    <Text style={styles.dateText}>{article.date}</Text>
                  </View>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#D1D5DB" />
            </TouchableOpacity>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
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
