String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};


class Comment {
    constructor(body) {
        this.body = body;
        this.children = new Array()
    }
}


class TreeComments extends Array {
    constructor(comments) {
        super()
        const root = new Map();
        let id, parent_id;

        for (const comment of comments) {
            if (root.has(id = comment.id)) {
                (root.get(id)).body = comment;
            } else {
                root.set(id, new Comment(comment));
            }
            if (parent_id = comment.post_id) {
                if (!root.has(parent_id)) {
                    root.set(parent_id, new Comment());
                }
                (root.get(parent_id)).children.push(root.get(id));
            } else {
                this.push(root.get(id));
            }
        }
    }
}


function getBaseHtml() {
    return `<div class="paper section">
    <div class="section-body">
        <div class="fs_e5">
            <div class="fs_b8"><!--1111 Title---></div><button
                class="btn is-plain is-icon size-sm" type="button" data-media-up="sm"><svg
                    class="svg-inline--fa fa-ellipsis" aria-hidden="true" focusable="false"
                    data-prefix="fas" data-icon="ellipsis" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">
                    <path class="" fill="currentColor"
                        d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z">
                    </path>
                </svg><!----></button><!---->
        </div>
        <div class="fs_e6"><a href="/ru/user/5835754" class="user-inline" data-media-up="sm"><img 
                    class="avatar is-circle is-shadow size-sm"
                    src="https://cover.imglib.info/uploads/users/5835754/3zEytDh8oER9.jpg"
                    alt="Аватар пользователя" loading="lazy"><!--1111 this href change to f'test-front.mangalib.me/ru/user/{user_id}'-->
                    <!--1111 this src change to f'https://cover.imglib.info/uploads/users/{user_id}/{user_avatar}'-->
                <div class="user-inline__body"><span class="user-inline__username"><!--1111 author username--></span></div>
            </a><span class="fs_ft"><!--1111 relation date of created_at--></span>
            <div class="btns"><button class="btn is-link variant-secondary" type="button"><svg
                        class="svg-inline--fa fa-eye fa-sm" aria-hidden="true" focusable="false"
                        data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512">
                        <path class="" fill="currentColor"
                            d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z">
                        </path>
                    </svg><span><!--1111 count of views--></span><!----></button><button class="btn is-link variant-secondary"
                    type="button"><svg
                        class="svg-inline--fa fa-comment" aria-hidden="true" focusable="false"
                        data-prefix="fas" data-icon="comment" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path class="" fill="currentColor"
                            d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z">
                        </path>
                    </svg><span><!--1111 count of comments--></span><!----></button></div>
        </div>
        <div class="fs_f">
            <div class="node-doc text-content">
                <!--1111 Text-->
            </div>
        </div>
    </div>
</div>
<div class="paper">
    <div class="fs_ag section-body">
        <div class="section-title"><!--1111 Count of commentaries and word "Комментариев(-й/-я)"--></div>
        <div id="comments" class="comments">
            <div class="comments-head">
                <div class="comments-head__actions btns"><button class="btn is-plain size-sm"
                        type="button"><svg class="svg-inline--fa fa-sort fa-sm" aria-hidden="true"
                            focusable="false" data-prefix="fas" data-icon="sort" role="img"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path class="" fill="currentColor"
                                d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z">
                            </path>
                        </svg><span>Новые</span><!----><!----></button><!----><button
                        class="btn is-plain size-sm" type="button"><svg
                            class="svg-inline--fa fa-sliders fa-sm" aria-hidden="true" focusable="false"
                            data-prefix="fas" data-icon="sliders" role="img"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path class="" fill="currentColor"
                                d="M0 416c0-17.7 14.3-32 32-32l54.7 0c12.3-28.3 40.5-48 73.3-48s61 19.7 73.3 48L480 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-246.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 448c-17.7 0-32-14.3-32-32zm192 0c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM384 256c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm-32-80c32.8 0 61 19.7 73.3 48l54.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-54.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l246.7 0c12.3-28.3 40.5-48 73.3-48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32zm73.3 0L480 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-214.7 0c-12.3 28.3-40.5 48-73.3 48s-61-19.7-73.3-48L32 128C14.3 128 0 113.7 0 96S14.3 64 32 64l86.7 0C131 35.7 159.2 16 192 16s61 19.7 73.3 48z">
                            </path>
                        </svg><span>Настройки</span><!----></button><button
                        class="btn is-plain size-sm s9_c5 s0_c5" type="button">
                        <div class="fa-layers"><svg class="svg-inline--fa fa-circle" aria-hidden="true"
                                focusable="false" data-prefix="fas" data-icon="circle" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <defs class="">
                                    <clipPath class="" id="clip-7b7jqUl8RSlb">
                                        <path class="" fill="currentColor"
                                            d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z">
                                        </path>
                                    </clipPath>
                                    <mask class="" x="0" y="0" width="100%" height="100%"
                                        id="mask-28EQrIU77ZkT" maskUnits="userSpaceOnUse"
                                        maskContentUnits="userSpaceOnUse">
                                        <rect class="" x="0" y="0" width="100%" height="100%"
                                            fill="white"></rect>
                                        <g class="" transform="translate(224 256)">
                                            <g class=""
                                                transform="translate(115.2, -179.2)  scale(0.6875, 0.6875)  rotate(0 0 0)">
                                                <path class="" fill="black"
                                                    d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"
                                                    transform="translate(-256 -256)"></path>
                                            </g>
                                        </g>
                                    </mask>
                                </defs>
                                <rect class="" fill="currentColor" clip-path="url(#clip-7b7jqUl8RSlb)"
                                    mask="url(#mask-28EQrIU77ZkT)" x="0" y="0" width="100%"
                                    height="100%"></rect>
                            </svg><svg class="svg-inline--fa fa-circle-check s9_eh" aria-hidden="true"
                                focusable="false" data-prefix="fas" data-icon="circle-check" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                style="transform-origin: 0.75em 0.1125em;">
                                <g class="" transform="translate(256 256)">
                                    <g class=""
                                        transform="translate(128, -198.4)  scale(0.625, 0.625)  rotate(0 0 0)">
                                        <path class="" fill="currentColor"
                                            d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                                            transform="translate(-256 -256)"></path>
                                    </g>
                                </g>
                            </svg></div><span class="s9_y">Увед. включены</span><!----><!---->
                    </button></div><button class="btn size-xs comments-head__rules" type="button">
                    правила <!----></button>
            </div>
            <div class="comments-form">
                <div class="comments-form__text"> Написать комментарий... </div>
            </div><!---->
            <div class="comments-list"><!--1111 Comments list--></div>
        </div>
    </div>
</div>`
};


async function get_discussion_topic(id) {
    return await (await fetch(`https://lib.social/api/forum/discussion/${id}`)).json();
};


async function get_discussion_comments(id) {
    let data = [];
    let url = 'https://lib.social/api/forum/posts?page={}&discussion_id={}';
    let page = 1;
    while (true) {
        let json = await (await fetch(url.format(page++, id))).json();
        if (!json.data.length) break;
        data.push(...json.data);
    }
    return new TreeComments(data);
}


function formatText(ops) {
    function getAttributes(prop) {
        let attrs = ['node-text'];
        let url = '';
        for (let attr in prop.attributes) {
            if (prop.attributes[attr]) {
                if (['bold', 'italic', 'underline', 'strike'].includes(attr)) attrs.push('mark-' + attr);
            }
        }
        if (prop.attributes?.link) url = `href="${prop.attributes?.link}"`;
        return `class="${attrs.join(' ')}" ${url}`;
    }
    function tagName(prop) {
        return prop.attributes?.link ? 'a' : 'span';
    }
    let html = ''
    for (let prop of ops) {
        if (typeof prop.insert == 'string') {
            html += prop.insert.split('\n').map(v => {
                return `<${tagName(prop)} ${getAttributes(prop)}>${v}</${tagName(prop)}>`;
            }).join('<br class="node-hardBreak">')
        } else if (prop.insert) {
            html += `
            <div class="f-image">
                <img src="${prop.insert.image.src}" data-src="${prop.insert.image.src}" data-size="${prop.insert.image.width}x${prop.insert.image.height}" class="loaded _loaded" data-was-processed="true" style="max-width: 700px; max-height: 350px">
            </div>`
        }
        
    }
    return '<p class="node-paragraph" data-paragraph-index="1">' + html + '</p>';
}


function formatComment(ops) {
    function getText(attrs, text) {
        function _(attr, tag, t) {
            return (attrs[attr] ? (`<${attr == 'link' ? 'a href="' + attrs[attr] + '"' : tag}>`) : '') + t + (attrs[attr] ? `</${tag}>` : '')
        }
        if (!attrs) return text;
        return _('link', 'a', _('strike', 'del', _('underline', 'u', _('italic', 'i', _('bold', 'b', text)))))
    }
    let html = []
    for (let prop of ops) {
        if (typeof prop.insert == 'string') {
            let el = prop.insert.split('\n').map(v => {
                return getText(prop.attributes, v);
            });
            if (html.length) {
                html.splice(-1, 1, html.at(-1) + el[0])
                if (el.length > 1) html.push(...el.slice(1))
            } else {
                html.push(...el)
            }
        } else if (prop.insert) {
            html.push(`
            <div class="f-image">
                <img src="${prop.insert.image.src}" data-src="${prop.insert.image.src}" data-size="${prop.insert.image.width}x${prop.insert.image.height}" class="loaded _loaded" data-was-processed="true" style="max-width: 700px; max-height: 350px">
            </div>`)
        }
    }
    return '<p>' + html.join('</p><p>') + '</p>';
}


function relativeTime(created_at) {
    const intl = new Intl.RelativeTimeFormat('ru')
    let delay = (new Date(created_at) - new Date()) / 1000;
    if (delay > -30) {
        return 'Только что'
    } else if (delay > -60) {
        return intl.format(delay, 'second')
    } else if (delay > -3600) {
        return intl.format(Math.floor(delay / 60), 'minute')
    } else if (delay > -86400) {
        return intl.format(Math.floor(delay / 3600), 'hour')
    } else if (delay > -604800) {
        return intl.format(Math.floor(delay / 86400), 'day')
    } else if (delay > -2592000) {
        return intl.format(Math.floor(delay / 604800), 'week')
    } else if (delay > -31536000) {
        return intl.format(Math.floor(delay / 2592000), 'month')
    } else {
        return intl.format(Math.floor(delay / 31536000), 'year')
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    if (!(new URL(window.location.href)).pathname.startsWith('/forum/discussion/')) return;

    document.getElementsByClassName('container _offset-top')[0].innerHTML = getBaseHtml();

    // Get api data
    const data = await get_discussion_topic(window.location.href.split('/').at(-1));
    
    // Meta
    document.title = `${data.discussion.title}. Форум • SocialLIB`

    // Get divs
    const [ title, author, body ] = document.getElementsByClassName('section-body')[0].children;
    title.children[0].innerHTML = data.discussion.title;
    const [ author_a, author_span, author_div ] = author.children;
    author_a.setAttribute('href', `https://test-front.mangalib.me/ru/user/${data.discussion.user_id}`);
    if (data.discussion.avatar && data.discussion.avatar != '0') {
        author_a.children[0].setAttribute('src', `https://cover.imglib.info/uploads/users/${data.discussion.user_id}/${data.discussion.avatar}`);
    } else {
        author_a.children[0].setAttribute('src', 'https://test-front.mangalib.me/images/placeholders/user_avatar.png');
    }
    author_a.children[1].children[0].innerHTML = data.discussion.username;
    author_span.innerHTML = relativeTime(data.discussion.created_at);
    author_div.children[0].children[1].innerHTML = data.discussion.views.toString();
    author_div.children[1].children[1].innerHTML = data.discussion.answered.toString();
    body.children[0].innerHTML = formatText(data.post.body.ops);
    document.getElementsByClassName('section-title')[0].innerHTML = `${data.discussion.answered} Комментари${data.discussion.answered.toString().at(-1) == 1 ? 'й' : data.discussion.answered.toString().at(-1) in [2, 3, 4] ? 'я' : 'ев'}`;

    // Get api data
    const tree = await get_discussion_comments(window.location.href.split('/').at(-1));

    // Get divs
    const list = document.getElementsByClassName('comments-list')[0];
    function createCommentListAsString(comments, indent) {
        let text = ''
        for (let comment of comments.reverse()) {
            text += `
            <div id="comment_${comment.body.id}" class="comment">
                <div class="comment__body">
                    <div class="comment__head">
                        <a href="https://test-front.mangalib.me/ru/user/${comment.body.user_id}" class="comment-author__cover">
                            <img class="avatar is-rounded size-sm" src="${comment.body.avatar != '0' && comment.body.avatar != null ? `https://cover.imglib.info/uploads/users/${comment.body.user_id}/${comment.body.avatar}` : 'https://test-front.mangalib.me/images/placeholders/user_avatar.png'}" alt="Аватар пользователя" loading="lazy">
                        </a>
                        <div class="comment-author">
                            <a href="https://test-front.mangalib.me/ru/user/${comment.body.user_id}" class="comment-author__name">
                                ${comment.body.username}
                            </a>
                        </div>
                        <time class="comment__time date">${relativeTime(comment.body.created_at)}</time>
                    </div>
                    <div class="comment__content text-collapse">
                        <div>
                            ${formatComment(comment.body.body.ops)}
                        </div>
                    </div>
                    <div class="comment__controls">
                        <button class="btn is-link variant-primary" type="button"> ответить </button>
                        <button class="btn is-link variant-primary" type="button"> жалоба </button>
                        <button class="btn is-link comment__dropdown" type="button">
                            <svg class="svg-inline--fa fa-ellipsis fa-sm" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis" role="img" xmln="https://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path class fill="currentColor" d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
                ${!comment.children ? '' : `
                <div class="comment__children" data-comment-indent="${indent}">
                    <div class="comment__collapse"></div>`
                    + createCommentListAsString(comment.children, indent+1) + `
                </div>`}
            </div>`
        }
        return text
    }
    list.innerHTML = createCommentListAsString(tree, 1);
});
