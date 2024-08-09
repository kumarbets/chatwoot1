import { buildSearchParamsWithLocale } from '../helpers/urlParamsHelper';
import { generateEventParams } from './events';

const createConversation = params => {
  const referrerURL = window.referrerURL || '';
  const search = buildSearchParamsWithLocale(window.location.search);
  return {
    url: `/api/v1/widget/conversations${search}`,
    params: {
      contact: {
        name: params.fullName,
        email: params.emailAddress,
        phone_number: params.phoneNumber,
      },
      message: {
        content: params.message,
        timestamp: new Date().toString(),
        referer_url: referrerURL,
      },

    },
  };
};

const sendMessage = (content, replyTo) => {
  const referrerURL = window.referrerURL || '';
  const search = buildSearchParamsWithLocale(window.location.search);
  return {
    url: `/api/v1/widget/messages${search}`,
    params: {
      message: {
        content,
        reply_to: replyTo,
        timestamp: new Date().toString(),
        referer_url: referrerURL,
      },
    },
  };
};

const sendAttachment = ({ attachment, replyTo = null }) => {
  const { referrerURL = '' } = window;
  const timestamp = new Date().toString();
  const { file } = attachment;

  const formData = new FormData();
  if (typeof file === 'string') {
    formData.append('message[attachments][]', file);
  } else {
    formData.append('message[attachments][]', file, file.name);
  }

  formData.append('message[referer_url]', referrerURL);
  formData.append('message[timestamp]', timestamp);
  if (replyTo !== null) {
    formData.append('message[reply_to]', replyTo);
  }
  return {
    url: `/api/v1/widget/messages${window.location.search}`,
    params: formData,
  };
};

const getConversation = ({ before, after }) => ({
  url: `/api/v1/widget/messages${window.location.search}`,
  params: { before, after },
});

const updateMessage = id => ({
  url: `/api/v1/widget/messages/${id}${window.location.search}`,
});

const getAvailableAgents = token => ({
  url: '/api/v1/widget/inbox_members',
  params: {
    website_token: token,
  },
});



export default {
  createConversation,
  sendMessage,
  sendAttachment,
  getConversation,
  updateMessage,
  getAvailableAgents,
};
