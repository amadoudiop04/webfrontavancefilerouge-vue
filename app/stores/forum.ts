import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Comment {
  id: string
  postId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
}

export interface Post {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  image?: string
  createdAt: string
  likes: string[] // Array of user IDs who liked
  comments: Comment[]
}

export const useForumStore = defineStore('forum', () => {
  const posts = ref<Post[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Alex Johnson',
      userAvatar: 'https://i.pravatar.cc/150?img=12',
      content: 'Quelle victoire incroyable hier soir ! Le combat était spectaculaire 🔥',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: ['user2', 'user3'],
      comments: [
        {
          id: 'c1',
          postId: '1',
          userId: 'user2',
          userName: 'Sarah Martin',
          userAvatar: 'https://i.pravatar.cc/150?img=5',
          content: 'Complètement d\'accord ! Un des meilleurs combats de l\'année',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Sarah Martin',
      userAvatar: 'https://i.pravatar.cc/150?img=5',
      content: 'Qui va gagner le prochain combat ? J\'ai hâte de voir ça ! 🥊',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      likes: ['user1'],
      comments: []
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Marcus Rodriguez',
      userAvatar: 'https://i.pravatar.cc/150?img=33',
      content: 'Les statistiques de ce combattant sont impressionnantes ! 15 victoires consécutives, dont 12 par KO 💪 Il mérite vraiment le titre',
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      likes: ['user1', 'user2', 'user4', 'user5'],
      comments: [
        {
          id: 'c2',
          postId: '3',
          userId: 'user1',
          userName: 'Alex Johnson',
          userAvatar: 'https://i.pravatar.cc/150?img=12',
          content: 'Absolument ! Sa technique de frappe est redoutable',
          createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'c3',
          postId: '3',
          userId: 'user4',
          userName: 'Emma Davis',
          userAvatar: 'https://i.pravatar.cc/150?img=47',
          content: 'J\'attends son prochain combat avec impatience !',
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'Emma Davis',
      userAvatar: 'https://i.pravatar.cc/150?img=47',
      content: 'Regardez cette photo de l\'entraînement d\'hier ! L\'intensité est au maximum 🏋️‍♂️ #UFC #Training',
      image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      likes: ['user1', 'user2', 'user3'],
      comments: [
        {
          id: 'c4',
          postId: '4',
          userId: 'user2',
          userName: 'Sarah Martin',
          userAvatar: 'https://i.pravatar.cc/150?img=5',
          content: 'Incroyable niveau de préparation ! 👏',
          createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      id: '5',
      userId: 'user5',
      userName: 'Karim Benzema',
      userAvatar: 'https://i.pravatar.cc/150?img=68',
      content: 'Le classement poids léger vient d\'être mis à jour ! Qui selon vous mérite la prochaine chance au titre ? 🏆 Donnez vos prédictions !',
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      likes: ['user1', 'user3', 'user4'],
      comments: [
        {
          id: 'c5',
          postId: '5',
          userId: 'user1',
          userName: 'Alex Johnson',
          userAvatar: 'https://i.pravatar.cc/150?img=12',
          content: 'Je pense que le #3 a mérité sa chance après 5 victoires',
          createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'c6',
          postId: '5',
          userId: 'user3',
          userName: 'Marcus Rodriguez',
          userAvatar: 'https://i.pravatar.cc/150?img=33',
          content: 'Le champion actuel est trop fort, difficile de le battre !',
          createdAt: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  ])

  const sortedPosts = computed(() => {
    return [...posts.value].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  })

  const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
    const newPost: Post = {
      ...post,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      likes: [],
      comments: []
    }
    posts.value.unshift(newPost)
  }

  const toggleLike = (postId: string, userId: string) => {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      const likeIndex = post.likes.indexOf(userId)
      if (likeIndex > -1) {
        post.likes.splice(likeIndex, 1)
      } else {
        post.likes.push(userId)
      }
    }
  }

  const addComment = (postId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'postId'>) => {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      const newComment: Comment = {
        ...comment,
        id: `c${Date.now()}`,
        postId,
        createdAt: new Date().toISOString()
      }
      post.comments.push(newComment)
    }
  }

  const deletePost = (postId: string) => {
    posts.value = posts.value.filter(p => p.id !== postId)
  }

  const deleteComment = (postId: string, commentId: string) => {
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.comments = post.comments.filter(c => c.id !== commentId)
    }
  }

  return {
    posts,
    sortedPosts,
    addPost,
    toggleLike,
    addComment,
    deletePost,
    deleteComment
  }
})
