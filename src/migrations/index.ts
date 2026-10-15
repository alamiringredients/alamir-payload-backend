import * as migration_category_appearance from './20261015_category_appearance'
import * as migration_owned_translations from './20261014_owned_translations';
import * as migration_careers_form_copy from './20261015_careers_form_copy';
import * as migration_shared_columns from './20261015_shared_columns';
import * as migration_careers_card_copy from './20261015_careers_card_copy';
import * as migration_20261014_141851_initial_schema from './20261014_141851_initial_schema';
import * as migration_20261014_150523_email_delivery from './20261014_150523_email_delivery';
import * as migration_20261014_152034_email_recipient_optional from './20261014_152034_email_recipient_optional';
import * as migration_20261014_blocks_as_json from './20261014_blocks_as_json';
import * as migration_20261014_custom_page_forms from './20261014_custom_page_forms';
import * as migration_20261014_public_content from './20261014_public_content';

export const migrations = [
  {
    up: migration_20261014_141851_initial_schema.up,
    down: migration_20261014_141851_initial_schema.down,
    name: '20261014_141851_initial_schema',
  },
  {
    up: migration_20261014_150523_email_delivery.up,
    down: migration_20261014_150523_email_delivery.down,
    name: '20261014_150523_email_delivery',
  },
  {
    up: migration_20261014_152034_email_recipient_optional.up,
    down: migration_20261014_152034_email_recipient_optional.down,
    name: '20261014_152034_email_recipient_optional',
  },
  {
    up: migration_20261014_blocks_as_json.up,
    down: migration_20261014_blocks_as_json.down,
    name: '20261014_blocks_as_json',
  },
  {
    up: migration_20261014_custom_page_forms.up,
    down: migration_20261014_custom_page_forms.down,
    name: '20261014_custom_page_forms',
  },
  {
    up: migration_20261014_public_content.up,
    down: migration_20261014_public_content.down,
    name: '20261014_public_content'
  },
  { up: migration_owned_translations.up, down: migration_owned_translations.down, name: '20261014_owned_translations' },
  { up: migration_careers_form_copy.up, down: migration_careers_form_copy.down, name: '20261015_careers_form_copy' },
  { up: migration_shared_columns.up, down: migration_shared_columns.down, name: '20261015_shared_columns' },
  { up: migration_careers_card_copy.up, down: migration_careers_card_copy.down, name: '20261015_careers_card_copy' },
  {up:migration_category_appearance.up,down:migration_category_appearance.down,name:'20261015_category_appearance'},
];
