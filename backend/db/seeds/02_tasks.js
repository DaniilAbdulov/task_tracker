export const seed = async function (knex) {
    await knex("tasks").del();
    await knex("tasks").insert([
        {
            title: "at nulla suspendisse potenti cras in",
            description:
                "in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum",
            priority: 2,
            ends_in: "2023-12-15T00:00:00",
            created_at: "2023-11-24T00:00:00",
            updated_at: "2023-12-20T00:00:00",
            status: 1,
            inspector_id: 4,
            author_id: 2,
        },
        {
            title: "orci luctus et",
            description:
                "ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio",
            priority: 3,
            ends_in: "2023-12-05T00:00:00",
            created_at: "2023-11-26T00:00:00",
            updated_at: "2023-12-20T00:00:00",
            status: 3,
            inspector_id: 7,
            author_id: 2,
        },
        {
            title: "penatibus et magnis dis parturient montes nascetur",
            description:
                "lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam",
            priority: 1,
            ends_in: "2023-12-18T00:00:00",
            created_at: "2023-11-27T00:00:00",
            updated_at: "2023-12-20T00:00:00",
            status: 4,
            inspector_id: 3,
            author_id: 2,
        },
        {
            title: "faucibus cursus urna",
            description:
                "a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem",
            priority: 1,
            ends_in: "2023-12-16T00:00:00",
            created_at: "2023-11-23T00:00:00",
            updated_at: "2023-12-21T00:00:00",
            status: 4,
            inspector_id: 7,
            author_id: 1,
        },
        {
            title: "maecenas tincidunt lacus at velit vivamus",
            description:
                "tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy",
            priority: 2,
            ends_in: "2023-12-12T00:00:00",
            created_at: "2023-11-28T00:00:00",
            updated_at: "2023-12-22T00:00:00",
            status: 1,
            inspector_id: 4,
            author_id: 1,
        },
        {
            title: "amet eros suspendisse",
            description:
                "varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis",
            priority: 1,
            ends_in: "2023-12-12T00:00:00",
            created_at: "2023-11-25T00:00:00",
            updated_at: "2023-12-23T00:00:00",
            status: 3,
            inspector_id: 7,
            author_id: 1,
        },
        {
            title: "ante ipsum primis in faucibus orci luctus",
            description:
                "libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat",
            priority: 3,
            ends_in: "2023-12-01T00:00:00",
            created_at: "2023-11-25T00:00:00",
            updated_at: "2023-12-24T00:00:00",
            status: 1,
            inspector_id: 4,
            author_id: 1,
        },
        {
            title: "id nisl venenatis lacinia aenean sit",
            description:
                "metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis",
            priority: 1,
            ends_in: "2023-12-01T00:00:00",
            created_at: "2023-11-27T00:00:00",
            updated_at: "2023-12-25T00:00:00",
            status: 4,
            inspector_id: 7,
            author_id: 2,
        },
        {
            title: "habitasse platea dictumst etiam",
            description:
                "etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris",
            priority: 1,
            ends_in: "2023-12-27T00:00:00",
            created_at: "2023-11-25T00:00:00",
            updated_at: "2023-12-26T00:00:00",
            status: 1,
            inspector_id: 7,
            author_id: 1,
        },
        {
            title: "eu orci mauris",
            description:
                "condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas",
            priority: 2,
            ends_in: "2023-12-23T00:00:00",
            created_at: "2023-11-24T00:00:00",
            updated_at: "2023-12-27T00:00:00",
            status: 2,
            inspector_id: 4,
            author_id: 1,
        },
        {
            title: "id pretium iaculis",
            description:
                "pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim",
            priority: 1,
            ends_in: "2023-12-05T00:00:00",
            created_at: "2023-11-28T00:00:00",
            updated_at: "2023-12-28T00:00:00",
            status: 1,
            inspector_id: 4,
            author_id: 2,
        },
        {
            title: "ut mauris eget massa",
            description:
                "odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius",
            priority: 1,
            ends_in: "2023-12-21T00:00:00",
            created_at: "2023-11-24T00:00:00",
            updated_at: "2023-12-29T00:00:00",
            status: 3,
            inspector_id: 3,
            author_id: 2,
        },
        {
            title: "eget eleifend luctus ultricies eu nibh quisque",
            description:
                "a pede posuere nonummy integer non velit donec diam neque",
            priority: 2,
            ends_in: "2023-12-15T00:00:00",
            created_at: "2023-11-29T00:00:00",
            updated_at: "2023-12-30T00:00:00",
            status: 1,
            inspector_id: 5,
            author_id: 1,
        },
        {
            title: "odio justo sollicitudin ut suscipit a",
            description:
                "lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum",
            priority: 1,
            ends_in: "2023-12-21T00:00:00",
            created_at: "2023-11-27T00:00:00",
            updated_at: "2023-12-31T00:00:00",
            status: 2,
            inspector_id: 7,
            author_id: 2,
        },
        {
            title: "fermentum donec ut mauris eget massa",
            description:
                "sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet",
            priority: 2,
            ends_in: "2023-12-30T00:00:00",
            created_at: "2023-11-29T00:00:00",
            updated_at: "2024-01-02T00:00:00",
            status: 1,
            inspector_id: 7,
            author_id: 2,
        },
        {
            title: "pede posuere nonummy integer",
            description:
                "etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla",
            priority: 3,
            ends_in: "2023-12-13T00:00:00",
            created_at: "2023-11-28T00:00:00",
            updated_at: "2024-01-03T00:00:00",
            status: 2,
            inspector_id: 7,
            author_id: 2,
        },
        {
            title: "posuere nonummy integer non",
            description:
                "quis lectus suspendisse potenti in eleifend quam a odio in hac",
            priority: 2,
            ends_in: "2023-12-10T00:00:00",
            created_at: "2023-11-24T00:00:00",
            updated_at: "2024-01-04T00:00:00",
            status: 1,
            inspector_id: 7,
            author_id: 2,
        },
        {
            title: "nullam orci pede venenatis",
            description:
                "leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis",
            priority: 1,
            ends_in: "2023-12-21T00:00:00",
            created_at: "2023-11-26T00:00:00",
            updated_at: "2024-01-05T00:00:00",
            status: 3,
            inspector_id: 7,
            author_id: 1,
        },
        {
            title: "duis bibendum felis sed interdum venenatis turpis",
            description:
                "sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea",
            priority: 2,
            ends_in: "2023-12-22T00:00:00",
            created_at: "2023-11-24T00:00:00",
            updated_at: "2024-01-06T00:00:00",
            status: 4,
            inspector_id: 5,
            author_id: 2,
        },
        {
            title: "nulla tellus in",
            description:
                "eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut",
            priority: 3,
            ends_in: "2023-12-22T00:00:00",
            created_at: "2023-11-28T00:00:00",
            updated_at: "2024-01-07T00:00:00",
            status: 2,
            inspector_id: 5,
            author_id: 2,
        },
        {
            title: "lacus at velit vivamus vel",
            description:
                "sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus",
            priority: 1,
            ends_in: "2023-12-14T00:00:00",
            created_at: "2023-11-28T00:00:00",
            updated_at: "2024-01-08T00:00:00",
            status: 3,
            inspector_id: 4,
            author_id: 1,
        },
        {
            title: "varius ut blandit non interdum in",
            description:
                "est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in",
            priority: 1,
            ends_in: "2023-12-21T00:00:00",
            created_at: "2023-11-26T00:00:00",
            updated_at: "2024-01-09T00:00:00",
            status: 2,
            inspector_id: 4,
            author_id: 2,
        },
        {
            title: "proin eu mi",
            description:
                "nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia",
            priority: 3,
            ends_in: "2023-12-07T00:00:00",
            created_at: "2023-11-25T00:00:00",
            updated_at: "2024-01-09T00:00:00",
            status: 3,
            inspector_id: 6,
            author_id: 2,
        },
        {
            title: "sit amet eleifend pede",
            description:
                "sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu",
            priority: 1,
            ends_in: "2023-12-30T00:00:00",
            created_at: "2023-11-24T00:00:00",
            updated_at: "2024-01-09T00:00:00",
            status: 2,
            inspector_id: 5,
            author_id: 2,
        },
        {
            title: "lectus pellentesque at",
            description:
                "integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique",
            priority: 3,
            ends_in: "2023-12-05T00:00:00",
            created_at: "2023-11-28T00:00:00",
            updated_at: "2024-01-10T00:00:00",
            status: 4,
            inspector_id: 7,
            author_id: 1,
        },
        {
            title: "quis orci nullam molestie nibh in lectus",
            description:
                "erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum",
            priority: 3,
            ends_in: "2023-12-15T00:00:00",
            created_at: "2023-11-23T00:00:00",
            updated_at: "2024-01-11T00:00:00",
            status: 2,
            inspector_id: 4,
            author_id: 2,
        },
        {
            title: "aliquam non mauris morbi",
            description:
                "lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien",
            priority: 1,
            ends_in: "2023-12-17T00:00:00",
            created_at: "2023-11-22T00:00:00",
            updated_at: "2024-01-12T00:00:00",
            status: 3,
            inspector_id: 4,
            author_id: 2,
        },
        {
            title: "ligula in lacus curabitur at",
            description:
                "molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum",
            priority: 3,
            ends_in: "2023-12-11T00:00:00",
            created_at: "2023-11-23T00:00:00",
            updated_at: "2024-01-13T00:00:00",
            status: 3,
            inspector_id: 4,
            author_id: 2,
        },
        {
            title: "magna vestibulum aliquet ultrices erat tortor",
            description:
                "at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat",
            priority: 2,
            ends_in: "2023-12-24T00:00:00",
            created_at: "2023-11-22T00:00:00",
            updated_at: "2024-01-14T00:00:00",
            status: 2,
            inspector_id: 7,
            author_id: 1,
        },
        {
            title: "nunc vestibulum ante ipsum primis",
            description:
                "montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum",
            priority: 3,
            ends_in: "2023-12-19T00:00:00",
            created_at: "2023-11-26T00:00:00",
            updated_at: "2024-01-15T00:00:00",
            status: 1,
            inspector_id: 7,
            author_id: 2,
        },
    ]);
};
