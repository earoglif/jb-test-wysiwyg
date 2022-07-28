import { Schema } from 'prosemirror-model';

export default new Schema({
    nodes: {
        doc: {
            content: 'block+'
        },
        text: {
            group: 'inline'
        },
        paragraph: {
            content: 'inline*',
            group: 'block',
            toDOM() {
                return ['p', { class: 'paragraph' }, 0];
            }
        },
        heading: {
            attrs: { level: { default: 1 } },
            content: 'inline*',
            group: 'block',
            defining: true,
            toDOM(node) {
                return [`h${node.attrs.level}`, 0];
            }
        }
    },
    marks: {
        strong: {
            toDOM() {
                return ['strong', { class: 'strong' }, 0];
            }
        },
        em: {
            toDOM() {
                return ['em', { class: 'em' }, 0];
            }
        },
        error: {
            toDOM() {
                return ['span', { class: 'error' }, 0];
            }
        }
    }
});
