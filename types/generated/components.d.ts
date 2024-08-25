import type { Schema, Attribute } from '@strapi/strapi';

export interface SeoMeta extends Schema.Component {
  collectionName: 'components_seo_metas';
  info: {
    displayName: 'meta';
    icon: 'info';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media<'images'>;
  };
}

export interface NavigationItem extends Schema.Component {
  collectionName: 'components_navigation_items';
  info: {
    displayName: 'Item';
    icon: 'th-list';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    link: Attribute.String;
    icon: Attribute.Media<'images'>;
    background: Attribute.String;
  };
}

export interface NavigationBlock extends Schema.Component {
  collectionName: 'components_navigation_blocks';
  info: {
    displayName: 'block';
    icon: 'list-alt';
  };
  attributes: {
    title: Attribute.String;
    item: Attribute.Component<'navigation.item', true>;
  };
}

export interface GlobalNewsletter extends Schema.Component {
  collectionName: 'components_global_newsletters';
  info: {
    displayName: 'Newsletter';
    icon: 'envelope';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    cta: Attribute.Component<'global.button'>;
  };
}

export interface GlobalContent extends Schema.Component {
  collectionName: 'components_global_contents';
  info: {
    displayName: 'content';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'custom';
        }
      >;
  };
}

export interface GlobalButton extends Schema.Component {
  collectionName: 'components_global_buttons';
  info: {
    displayName: 'button';
    icon: 'external-link-alt';
  };
  attributes: {
    text: Attribute.String;
    link: Attribute.String;
  };
}

export interface ContentInfoBlock extends Schema.Component {
  collectionName: 'components_content_info_blocks';
  info: {
    displayName: 'infoBlock';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'custom';
        }
      >;
    image: Attribute.Media<'images'>;
  };
}

export interface ContentFaq extends Schema.Component {
  collectionName: 'components_content_faqs';
  info: {
    displayName: 'faq';
    icon: 'ankh';
    description: '';
  };
  attributes: {
    question: Attribute.String & Attribute.Required;
    answer: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbarBaloon';
        }
      >;
  };
}

export interface ContentChapter extends Schema.Component {
  collectionName: 'components_content_chapters';
  info: {
    displayName: 'chapter';
    icon: 'file-contract';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    galery: Attribute.Media<'images', true>;
    button: Attribute.Component<'global.button'>;
    text: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'custom';
        }
      >;
    banners_static: Attribute.Relation<
      'content.chapter',
      'oneToOne',
      'api::banner-static.banner-static'
    >;
    idTarget: Attribute.String;
  };
}

export interface ContentArticle extends Schema.Component {
  collectionName: 'components_content_articles';
  info: {
    displayName: 'article';
    icon: 'audio-description';
    description: '';
  };
  attributes: {
    article: Attribute.Relation<
      'content.article',
      'oneToOne',
      'api::article.article'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'seo.meta': SeoMeta;
      'navigation.item': NavigationItem;
      'navigation.block': NavigationBlock;
      'global.newsletter': GlobalNewsletter;
      'global.content': GlobalContent;
      'global.button': GlobalButton;
      'content.info-block': ContentInfoBlock;
      'content.faq': ContentFaq;
      'content.chapter': ContentChapter;
      'content.article': ContentArticle;
    }
  }
}
