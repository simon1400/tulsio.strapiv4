import type { Attribute, Schema } from '@strapi/strapi';

export interface ContentArticle extends Schema.Component {
  collectionName: 'components_content_articles';
  info: {
    description: '';
    displayName: 'article';
    icon: 'audio-description';
  };
  attributes: {
    article: Attribute.Relation<
      'content.article',
      'oneToOne',
      'api::article.article'
    >;
  };
}

export interface ContentChapter extends Schema.Component {
  collectionName: 'components_content_chapters';
  info: {
    description: '';
    displayName: 'chapter';
    icon: 'file-contract';
  };
  attributes: {
    banners_static: Attribute.Relation<
      'content.chapter',
      'oneToOne',
      'api::banner-static.banner-static'
    >;
    button: Attribute.Component<'global.button'>;
    galery: Attribute.Media<'images', true>;
    idTarget: Attribute.String;
    text: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'custom';
        }
      >;
    title: Attribute.String;
  };
}

export interface ContentFaq extends Schema.Component {
  collectionName: 'components_content_faqs';
  info: {
    description: '';
    displayName: 'faq';
    icon: 'ankh';
  };
  attributes: {
    answer: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbarBaloon';
        }
      >;
    question: Attribute.String & Attribute.Required;
  };
}

export interface ContentInfoBlock extends Schema.Component {
  collectionName: 'components_content_info_blocks';
  info: {
    description: '';
    displayName: 'infoBlock';
  };
  attributes: {
    background: Attribute.Enumeration<
      ['blue', 'green', 'yellow', 'purple', 'bluePurpleG', 'greenYellowG']
    >;
    description: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'custom';
        }
      >;
    image: Attribute.Media<'images'>;
    title: Attribute.String;
  };
}

export interface ContentMedia extends Schema.Component {
  collectionName: 'components_content_media';
  info: {
    description: '';
    displayName: 'media';
  };
  attributes: {
    audio: Attribute.Media<'audios'>;
    podcastLinks: Attribute.Component<'content.podcast-links', true>;
  };
}

export interface ContentPodcastLinks extends Schema.Component {
  collectionName: 'components_content_podcast_links';
  info: {
    description: '';
    displayName: 'podcastLinks';
  };
  attributes: {
    logo: Attribute.Media<'images'>;
    name: Attribute.String;
    url: Attribute.String;
  };
}

export interface GlobalButton extends Schema.Component {
  collectionName: 'components_global_buttons';
  info: {
    description: '';
    displayName: 'button';
    icon: 'external-link-alt';
  };
  attributes: {
    link: Attribute.String;
    ServiceImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    text: Attribute.String;
  };
}

export interface GlobalContent extends Schema.Component {
  collectionName: 'components_global_contents';
  info: {
    displayName: 'content';
  };
  attributes: {
    description: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'custom';
        }
      >;
    title: Attribute.String;
  };
}

export interface GlobalNewsletter extends Schema.Component {
  collectionName: 'components_global_newsletters';
  info: {
    description: '';
    displayName: 'Newsletter';
    icon: 'envelope';
  };
  attributes: {
    cta: Attribute.Component<'global.button'>;
    title: Attribute.String;
  };
}

export interface NavigationBlock extends Schema.Component {
  collectionName: 'components_navigation_blocks';
  info: {
    displayName: 'block';
    icon: 'list-alt';
  };
  attributes: {
    item: Attribute.Component<'navigation.item', true>;
    title: Attribute.String;
  };
}

export interface NavigationItem extends Schema.Component {
  collectionName: 'components_navigation_items';
  info: {
    description: '';
    displayName: 'Item';
    icon: 'th-list';
  };
  attributes: {
    background: Attribute.String;
    icon: Attribute.Media<'images'>;
    link: Attribute.String;
    name: Attribute.String;
  };
}

export interface SeoMeta extends Schema.Component {
  collectionName: 'components_seo_metas';
  info: {
    displayName: 'meta';
    icon: 'info';
  };
  attributes: {
    description: Attribute.Text;
    image: Attribute.Media<'images'>;
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'content.article': ContentArticle;
      'content.chapter': ContentChapter;
      'content.faq': ContentFaq;
      'content.info-block': ContentInfoBlock;
      'content.media': ContentMedia;
      'content.podcast-links': ContentPodcastLinks;
      'global.button': GlobalButton;
      'global.content': GlobalContent;
      'global.newsletter': GlobalNewsletter;
      'navigation.block': NavigationBlock;
      'navigation.item': NavigationItem;
      'seo.meta': SeoMeta;
    }
  }
}
