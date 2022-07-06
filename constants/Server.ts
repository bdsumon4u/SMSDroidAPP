export const settings = ({
  'project_name': 'HotashXMS',
  'author': 'Sumon Ahmed',
  'organization': 'HotashTech',
  'version': '1.0',
});

export const storage = ({
  'server': '@auth/server',
  'token': '@auth/token',
  'queued': '@queued/sms',
  'sending_settings': '@settings/sending',
});

export const status=({
  'delivered':'delivered',
  'pending':'pending',
  'failed':'failed',
  'running':'running',
  'fetched':'fetched',
})