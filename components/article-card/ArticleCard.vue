<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-3">
            John Smith
          </p>
          <p class="subtitle is-6">
            <time datetime="2016-1-1">11:09 PM</time>
          </p>
        </div>
      </div>

      <div class="content">
        <h3>Title of articles</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, nobis minima! Magni officia eius necessitatibus ducimus rem quasi minus ut adipisci temporibus illum quidem sunt corporis est explicabo aspernatur vero nisi tempora, reiciendis libero voluptates sit dolores mollitia. Neque, impedit!</p>
      </div>
      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <p>Read more...</p>
        <b-taglist class="pt-2 px-2">
          <b-tag class="has-background-white-ter has-text-grey is-clickable">
            tag
          </b-tag>
          <b-tag class="has-background-white-ter has-text-grey is-clickable">
            tag 2
          </b-tag>
          <b-tag class="has-background-white-ter has-text-grey is-clickable">
            tag 3
          </b-tag>
        </b-taglist>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {}
}
</script>
