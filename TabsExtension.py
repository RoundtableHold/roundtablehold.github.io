from markdown.blockprocessors import BlockProcessor
from markdown.extensions import Extension
import xml.etree.ElementTree as etree
import re

def to_id(name):
    name = str(name)
    name = "".join(name.split())
    name = re.sub(r'\W+', '', name)
    name = re.sub(r'0', 'Zero', name)
    name = re.sub(r'1', 'One', name)
    name = re.sub(r'2', 'Two', name)
    name = re.sub(r'3', 'Three', name)
    name = re.sub(r'4', 'Four', name)
    name = re.sub(r'5', 'Five', name)
    name = re.sub(r'6', 'Six', name)
    name = re.sub(r'7', 'Seven', name)
    name = re.sub(r'8', 'Eight', name)
    name = re.sub(r'9', 'Nine', name)
    name = re.sub(r'(.)([A-Z][a-z]+)', r'\1_\2', name)
    name = re.sub(r'__([A-Z])', r'_\1', name)
    name = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', name)
    return name.lower()

class TabsBlockProcessor(BlockProcessor):
    RE_TABS_START = r'^\[Tabs\]'
    RE_TABS_END = r'^\[End Tabs\]'
    RE_TAB_START = r'^\[Tab "([^"]+)"\]\n'

    def test(self, parent, block):
        return re.match(self.RE_TABS_START, block)

    def run(self, parent, blocks):
        print('TabsBlock', blocks[0])
        original_block = blocks[0]
        blocks[0] = re.sub(self.RE_TABS_START, '', blocks[0])

        ids = []
        for block_num, block in enumerate(blocks):
            print(block)
            print('$')
            if re.search(self.RE_TAB_START, block):
                ids.append(re.match(self.RE_TAB_START, block)[1])
            if re.search(self.RE_TABS_END, block):
                blocks[block_num] = re.sub(self.RE_TABS_END, '', block)

                nav = etree.SubElement(parent, 'ul')
                nav.set('class', 'nav nav-tabs')
                for i, title in enumerate(ids):
                    li = etree.SubElement(nav, 'li')
                    li.set('class', 'nav-item')
                    button = etree.SubElement(li, 'button')
                    button.set('class', 'nav-link' + (' active' if i == 0 else ''))
                    button.set('data-bs-toggle', 'tab')
                    button.set('data-bs-target', '#' + to_id(title))
                    button.text = title
                tab_content = etree.SubElement(parent, 'div')
                tab_content.set('class', 'tab-content')
                self.parser.parseBlocks(tab_content, blocks[1:block_num])

                for i in range(0, block_num + 1):
                    blocks.pop(0)
                return True
        blocks[0] = original_block
        return False

class TabBlockProcessor(BlockProcessor):
    RE_TAB_START = r'^\[Tab "([^"]+)"\]\n'

    def test(self, parent, block):
        return re.match(self.RE_TAB_START, block)

    def run(self, parent, blocks):
        print('TabBlock', blocks[0])
        original_block = blocks[0]
        match = re.match(self.RE_TAB_START, original_block)
        id = match[1]
        blocks[0] = re.sub(self.RE_TAB_START, '', blocks[0])
        e = etree.SubElement(parent, 'div')
        e.set('class', 'tab-pane fade')
        e.set('id', to_id(id))
        self.parser.parseBlocks(e, blocks[0:1])
        blocks.pop(0)

class TabsExtension(Extension):
    def extendMarkdown(self, md):
        md.parser.blockprocessors.register(TabsBlockProcessor(md.parser), 'tabs', 175)
        md.parser.blockprocessors.register(TabBlockProcessor(md.parser), 'tab', 175)