import {
    Request,
    Response,
} from "express";

import * as service from "./invitation.service";

type TokenParams = {
    token: string;
};

type IdParams = {
    id: string;
};

function getAuthHeader(
    req: Request
) {
    const authorization =
        req.headers.authorization;

    if (!authorization) {
        throw new Error(
            "Missing Authorization header"
        );
    }

    return authorization;
}

export async function create(
    req: Request,
    res: Response
) {
    const result =
        await service.create(
            {
                resourceType:
                    req.body.resourceType,

                resourceId:
                    req.body.resourceId,

                resourceAction:
                    req.body.resourceAction,

                email:
                    req.body.email,

                role:
                    req.body.role,
            },
            getAuthHeader(req)
        );

    res.status(201).json(result);
}

export async function listByResource(
    req: Request,
    res: Response
) {
    const invitations =
        await service.listByResource(
            req.query.resourceType as string,
            req.query.resourceId as string,
            getAuthHeader(req)
        );

    res.json(invitations);
}

export async function listMine(
    req: Request,
    res: Response
) {
    const invitations =
        await service.listMine(
            getAuthHeader(req)
        );

    res.json(invitations);
}

export async function getByToken(
    req: Request<TokenParams>,
    res: Response
) {
    const invitation =
        await service.getByToken(
            req.params.token,
            getAuthHeader(req)
        );

    res.json(invitation);
}

export async function validate(
    req: Request<TokenParams>,
    res: Response
) {
    const invitation =
        await service.validate(
            req.params.token,
            getAuthHeader(req)
        );

    res.json(invitation);
}

export async function accept(
    req: Request<IdParams>,
    res: Response
) {
    const invitation =
        await service.accept(
            req.params.id,
            getAuthHeader(req)
        );

    res.json(invitation);
}

export async function decline(
    req: Request<IdParams>,
    res: Response
) {
    const invitation =
        await service.decline(
            req.params.id,
            getAuthHeader(req)
        );

    res.json(invitation);
}

export async function revoke(
    req: Request<IdParams>,
    res: Response
) {
    const invitation =
        await service.revoke(
            req.params.id,
            getAuthHeader(req)
        );

    res.json(invitation);
}