import defaultSlugify from 'slugify';

export const generateSlug = (text: string): string => {
  return defaultSlugify(text, {
    lower: true,
    strict: true,
    locale: 'vi',
    trim: true,
  });
};
