<template>
  <div>
    <template v-if="isLoading">
      <b-skeleton height="100" />
    </template>
    <template v-else>
      <ProfileCard
        :user-profile="user"
      />
    </template>
  </div>
</template>

<script>
// import { getItem, setItem } from '@/helpers'
import userProfile from '@/api/userProfile'
import ProfileCard from '@/components/profile-card/ProfileCard.vue'

export default {
  name: 'ProfilePage',
  components: { ProfileCard },
  async asyncData ({ params }) {
    try {
      const user = await userProfile.getUserProfile([params.user])
      console.log('user', user)
      return { user }
    } catch (error) {
      // TODO: Handle possible errors
    }
  },
  head () {
    return {
      titleTemplate: 'Profile'
    }
  },
  computed: {
    userProfileSlug () {
      return this.$route.params.user
    },
    // apiUrlForFavorites () {
    //   return `/articles?favorited=${this.userProfileSlug.username}`
    // },
    // apiUrl () {
    //   return `/articles?author=${this.userProfileSlug.username}`
    // },
    isLoading () {
      return this.$store.state.userProfile.isLoading
    }
  }
}
</script>
